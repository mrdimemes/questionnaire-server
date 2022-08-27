interface Question {
  id: number;
  questionnaire_id: number;
  question_type: string;
  question_text: string;
  is_required: boolean;
}

export default Question