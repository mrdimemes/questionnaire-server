interface Question {
  id: number;
  questionnaireId: number;
  questionType: string;
  text: string;
  isRequired: boolean;
}

export default Question