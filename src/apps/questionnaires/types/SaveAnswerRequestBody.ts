import { AnswerFromClient } from "./";

type SaveAnswerRequestBody = {
  userId?: number;
  answer: AnswerFromClient;
}

export default SaveAnswerRequestBody