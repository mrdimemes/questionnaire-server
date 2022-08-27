import QuestionDTO from "./QuestionDTO";

class QuestionnaireDTO {
  id: number;
  label: string;
  about: string;
  tags: number[];
  questions: QuestionDTO[];

  constructor(id: number, label: string, about: string, tags: number[], questions: QuestionDTO[]) {
    this.id = id;
    this.label = label;
    this.about = about;
    this.tags = tags;
    this.questions = questions;
  }
}

export default QuestionnaireDTO