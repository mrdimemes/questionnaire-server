import { QuestionnaireConnector, RelationConnector } from "../../mysql";

class QuestionnaireService {
  private questionnaireConnector = QuestionnaireConnector;
  private relationConnector = RelationConnector;

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
    await this.questionnaireConnector.removeQuestionnaire(questionnaireId);
    let affectedRows = 1;
    const questions = await this.questionnaireConnector
      .findQuestionnaireQuestions(questionnaireId);
    for (const question of questions) {
      affectedRows += (await this.removeQuestion(question.id)).affectedRows;
    };
    affectedRows += await this.relationConnector
      .removeTagsByQuestionnaire(questionnaireId)
    return { affectedRows };
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
}

export default new QuestionnaireService();