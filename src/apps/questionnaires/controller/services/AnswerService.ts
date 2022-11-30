import { AnswerDTO, StatisticsDTO } from "../../DTOs";
import { AnswerConnector } from "../../mysql";
import { AnswerFromClient } from "../../types";

class AnswerService {
  private answerConnector = AnswerConnector;

  async saveAnswer(answer: AnswerFromClient, user?: number) {
    //validation needs to be here later
    const answerId = await this.answerConnector
      .addAnswer(user ?? null, answer.questionnaireId);
    for (const question of answer.questions) {
      for (const field of question.fields) {
        await this.answerConnector
          .addAnswerField(answerId, field.fieldId, field.value);
      }
    }
  }

  async getAnswers(questionnaireId: number) {
    return this.answerConnector.getAnswersWithFields(questionnaireId);
  }

  async getUserStatistics(userId: number) {
    const totalAnswers = (await this.answerConnector
      .getUserAnswers(userId)).length;
    const weekAnswers = (await this.answerConnector
      .getUserAnswers(userId, 7)).length;
    const monthAnswers = (await this.answerConnector
      .getUserAnswers(userId, 30)).length;
    const yearAnswers = (await this.answerConnector
      .getUserAnswers(userId, 365)).length;
    const lastAnswers = await this.answerConnector
      .getLastUserAnswers(userId, 3);
    return new StatisticsDTO(
      userId,
      totalAnswers,
      weekAnswers,
      monthAnswers,
      yearAnswers,
      lastAnswers.map(answer => {
        return new AnswerDTO(answer.questionnaire_id, answer.upload_date)
      }),
    );
    [totalAnswers, weekAnswers, monthAnswers, yearAnswers, lastAnswers]
  }
}

export default new AnswerService();