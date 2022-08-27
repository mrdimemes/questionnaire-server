import FieldDTO from "./FieldDTO";

class QuestionDTO {
  id: number;
  questionType: string;
  text: string;
  isRequired: boolean;
  fields: FieldDTO[];

  constructor(
    id: number,
    questionType: string,
    text: string,
    isRequired: boolean,
    fields: FieldDTO[]
  ) {
    this.id = id;
    this.questionType = questionType;
    this.text = text;
    this.isRequired = isRequired;
    this.fields = fields;
  }
}

export default QuestionDTO