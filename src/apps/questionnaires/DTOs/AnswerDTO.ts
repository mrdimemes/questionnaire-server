class AnswerDTO {
  questionnaireId: number;
  uploadDate: string;

  constructor(questionnaireId: number, uploadDate: string) {
    this.questionnaireId = questionnaireId;
    this.uploadDate = uploadDate;
  }
}

export default AnswerDTO;