import { QuestionnaireAnswer } from "./";

type SaveAnswerRequestBody = {
  userId?: number;
  answer: QuestionnaireAnswer;
}

export default SaveAnswerRequestBody