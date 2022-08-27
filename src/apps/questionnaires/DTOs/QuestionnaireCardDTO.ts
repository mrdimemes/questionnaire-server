class QuestionnaireCardDTO {
  id: number;
  label: string;
  tags: number[];

  constructor(id: number, label: string, tags: number[]) {
    this.id = id;
    this.label = label;
    this.tags = tags;
  }
}

export default QuestionnaireCardDTO