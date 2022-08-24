import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { Questionnaire, Question, Field } from "../models";

interface QuestionParam {
  questionnaireId: number;
  questionType: string;
  text: string;
  isRequired: boolean;
}

interface QuestionnaireParam {
  label: string;
  about: string;
}

class QuestionnaireController {
  private connector = MySQLConnector;

  async addField(questionId: number, text: string) {
    const sql = "INSERT INTO fields (question_id, field_text) VALUES (?, ?)";
    await this.connector.query(sql, [questionId, text]);
  }

  async findField(id: number) {
    const sql = "SELECT * FROM fields WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Field[];
    if (result.length === 0) throw Error("Field not found");
    return result[0];
  }

  async findQuestionFields(questionId: number) {
    const sql = "SELECT * FROM fields WHERE question_id = ?";
    const result = await this.connector.query(sql, [questionId]) as Field[];
    if (result.length === 0) throw Error("Fields not found");
    return result;
  }

  async removeField(id: number) {
    const sql = "DELETE FROM fields WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Field not found");
  }

  async addQuestion(question: QuestionParam) {
    const sql = "INSERT INTO questions " +
      "(questionnaire_id, question_type, question_text, is_required) " +
      "VALUES (?, ?, ?, ?)";
    await this.connector.query(sql, [
      question.questionnaireId,
      question.questionType,
      question.text,
      Number(question.isRequired)
    ]);
  }

  async findQuestion(id: number) {
    const sql = "SELECT * FROM questions WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Question[];
    if (result.length === 0) throw Error("Question not found");
    return result[0];
  }

  async findQuestionnaireQuestions(questionnaireId: number) {
    const sql = "SELECT * FROM questions WHERE questionnaire_id = ?";
    const result = await this.connector.query(
      sql, [questionnaireId]) as Question[];
    if (result.length === 0) throw Error("Questions not found");
    return result;
  }

  async removeQuestion(id: number) {
    const sql = "DELETE FROM questions WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Question not found");
  }

  async addQuestionnaire(questionnaire: QuestionnaireParam) {
    const sql = "INSERT INTO questionnaires (label, about) VALUES (?, ?)";
    await this.connector.query(
      sql, [questionnaire.label, questionnaire.about]);
  }

  async findQuestionnaire(id: number) {
    const sql = "SELECT * FROM questionnaires WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Questionnaire[];
    if (result.length === 0) throw Error("Questionnaire not found");
    return result[0];
  }

  async removeQuestionnaire(id: number) {
    const sql = "DELETE FROM questionnaires WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Questionnaire not found");
  }
}

export default new QuestionnaireController();