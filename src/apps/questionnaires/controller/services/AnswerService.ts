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
}

export default new AnswerService();