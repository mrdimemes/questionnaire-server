import {
  AnswerConnector,
  QuestionnaireConnector,
  RelationConnector,
} from "../../mysql";
import {
  QuestionnaireDTO,
  QuestionnaireCardDTO,
  QuestionnaireCardsPageDTO,
  FieldDTO,
  QuestionDTO
} from "../../DTOs";
import { SortOption } from "../../models";


class QuestionnaireService {
  private questionnaireConnector = QuestionnaireConnector;
  private relationConnector = RelationConnector;
  private answerConnector = AnswerConnector;

  async addQuestionnaire(
    label: string,
    about: string,
    questions: {
      questionType: string;
      text: string;
      isRequired: boolean;
      fields: string[]
    }[],
    tags: number[]
  ) {
    const questionnaireId = await this.questionnaireConnector
      .addQuestionnaire(label, about);
    for (const question of questions) {
      await this.addQuestion(
        questionnaireId,
        question.questionType,
        question.text,
        question.isRequired,
        question.fields
      );
    }
    for (const tagId of tags) {
      this.attachTagToQuestionnaire(questionnaireId, tagId);
    }
    return { questionnaireId };
  }

  async removeQuestionnaire(questionnaireId: number) {
    let affectedRows = 0;
    affectedRows += await this.answerConnector.deleteAnswers(questionnaireId);
    affectedRows += await this.relationConnector
      .removeQuestionnaireTagRelationsByQuestionnaireId(questionnaireId);
    const questions = await this.questionnaireConnector
      .findQuestionnaireQuestions(questionnaireId);
    for (const question of questions) {
      affectedRows += (await this.removeQuestion(question.id)).affectedRows;
    }
    affectedRows +=
      await this.questionnaireConnector.removeQuestionnaire(questionnaireId);
    return { affectedRows };
  }

  async editQuestionnaire(questionnaire: QuestionnaireDTO) {
    await this.removeQuestionnaire(questionnaire.id);
    await this.addQuestionnaire(
      questionnaire.label,
      questionnaire.about,
      questionnaire.questions.map(questionDTO => {
        return {
          questionType: questionDTO.questionType,
          text: questionDTO.text,
          isRequired: questionDTO.isRequired,
          fields: questionDTO.fields.map(fieldDTO => fieldDTO.text),
        }
      }),
      questionnaire.tags,
    );
  }

  async addQuestion(
    questionnaireId: number,
    questionType: string,
    text: string,
    isRequired: boolean,
    fields: string[]
  ) {
    const questionId = await this.questionnaireConnector
      .addQuestion(questionnaireId, questionType, text, isRequired);
    for (const fieldText of fields) {
      await this.addField(questionId, fieldText);
    }
    return { questionId };
  }

  async removeQuestion(questionId: number) {
    await this.questionnaireConnector.removeQuestion(questionId);
    const removedFields = await this.questionnaireConnector
      .removeFieldsByQuestionId(questionId);
    return { affectedRows: 1 + removedFields };
  }

  async addField(questionId: number, text: string) {
    const fieldId = await this.questionnaireConnector
      .addField(questionId, text);
    return { fieldId }
  }

  async removeField(id: number) {
    await this.questionnaireConnector.removeField(id);
    return { affectedRows: 1 };
  }

  async attachTagToQuestionnaire(questionnaireId: number, tagId: number) {
    await this.relationConnector
      .addQuestionnaireTagRelation(questionnaireId, tagId);
  }

  async detachTagFromQuestionnaire(questionnaireId: number, tagId: number) {
    await this.relationConnector
      .removeQuestionnaireTagRelation(questionnaireId, tagId);
  }

  async getQuestionnaire(questionnaireId: number) {
    const questionnaire = await this.questionnaireConnector
      .findQuestionnaire(questionnaireId);
    const questions = await this.questionnaireConnector
      .findQuestionnaireQuestions(questionnaireId);
    const questionsDTOs = await Promise.all(questions.map(async (question) => {
      const fields = await this.questionnaireConnector
        .findQuestionFields(question.id);
      const fieldDTOs = fields.map(field => {
        return new FieldDTO(field.id, field.field_text)
      });
      return new QuestionDTO(
        question.id,
        question.question_type,
        question.question_text,
        question.is_required,
        fieldDTOs
      );
    }))
    const questionnaireTagRelations = await this.relationConnector
      .findQuestionnaireTagRelationsByQuestionnaireId(questionnaire.id);
    return new QuestionnaireDTO(
      questionnaireId,
      questionnaire.label,
      questionnaire.about,
      questionnaireTagRelations.map(relation => relation.tag_id),
      questionsDTOs
    )
  }

  async getQuestionnaireCardPage(
    sortOption: SortOption | null,
    searchPhrase: string,
    filterTag: number | null,
    startPage: number,
    bunchSize: number,
  ) {
    const cardsInDB = await this.questionnaireConnector
      .getQuestionnairesCount(searchPhrase, filterTag);
    const totalPages = Math.ceil(cardsInDB / bunchSize);
    const questionnaires = await this.questionnaireConnector
      .getQuestionnairesBunch(
        sortOption,
        searchPhrase,
        filterTag,
        (startPage - 1) * bunchSize,
        bunchSize,
      );
    const cards = await Promise
      .all(questionnaires.map(async (questionnaire) => {
        const questionnaireTagRelations = await this.relationConnector
          .findQuestionnaireTagRelationsByQuestionnaireId(questionnaire.id);
        return new QuestionnaireCardDTO(
          questionnaire.id,
          questionnaire.label,
          questionnaireTagRelations.map(relation => relation.tag_id)
        );
      }));
    return new QuestionnaireCardsPageDTO(cards, totalPages);
  }
}

export default new QuestionnaireService();