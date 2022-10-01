import { QuestionTypeEnum, AnswerFieldFromClient} from "./";

type AnswerQuestionFromClient = {
  questionId: number;
  questionType: QuestionTypeEnum;
  fields: AnswerFieldFromClient[];
  isRequired: boolean;
}

export default AnswerQuestionFromClient;