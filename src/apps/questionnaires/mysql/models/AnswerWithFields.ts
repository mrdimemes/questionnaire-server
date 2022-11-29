interface AnswerWithFields {
  answer_id: number,
  user_id: number,
  questionnaire_id: number,
  upload_date: string,
  field_id: number,
  field_value: number,
}

export default AnswerWithFields