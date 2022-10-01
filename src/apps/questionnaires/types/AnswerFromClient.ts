import { AnswerQuestionFromClient } from "./";

type AnswerFromClient = {
  questionnaireId: number;
  questions: AnswerQuestionFromClient[];
}

export default AnswerFromClient;