import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";

import { Answer, AnswerWithFields } from "./models";


class AnswerConnector {
  private connector = MySQLConnector;

  async addAnswer(userId: number | null, questionnaireId: number) {
    const sql = "INSERT INTO answers " +
      "(user_id, questionnaire_id) VALUES (?, ?)";
    const resultHeader = await this.connector
      .query(sql, [userId, questionnaireId]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async addAnswerField(answerId: number, fieldId: number, value: string) {
    const sql = "INSERT INTO answer_fields " +
      "(answer_id, field_id, field_value) VALUES (?, ?, ?)";
    const resultHeader = await this.connector
      .query(sql, [answerId, fieldId, value]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async getAnswers(questionnaireId: number) {
    const sql = "SELECT * FROM answers WHERE questionnaire_id = ?";
    const answers = await this.connector
      .query(sql, [questionnaireId]) as Answer[];
    return answers;
  }

  async getAnswersWithFields(questionnaireId: number) {
    const sql = `
      SELECT answers.id AS answer_id, 
      answers.user_id, 
      answers.questionnaire_id, 
      answers.upload_date, 
      answer_fields.field_id, 
      answer_fields.field_value 
      FROM answers 
      INNER JOIN answer_fields 
      ON answers.id = answer_fields.answer_id 
      WHERE questionnaire_id = ?
    `
    const answers = await this.connector
      .query(sql, [questionnaireId]) as AnswerWithFields[];
    return answers;
  }

  async deleteAnswers(questionnaireId: number) {
    const answers = await this.getAnswers(questionnaireId);
    for await (const answer of answers) {
      this.deleteAnswerFields(answer.id);
    };
    const resultHeader = await this.connector.query(
      "DELETE FROM answers WHERE questionnaire_id = ?",
      [questionnaireId],
    ) as ResultSetHeader;
    return resultHeader.affectedRows;
  }

  async deleteAnswerFields(answerId: number) {
    const sql = "DELETE FROM answer_fields WHERE answer_id = ?";
    const resultHeader = await this.connector
      .query(sql, [answerId]) as ResultSetHeader;
    return resultHeader.affectedRows;
  }

  async getUserAnswers(userId: number, period?: number) {
    const sql = `
    SELECT * FROM answers 
    WHERE user_id = ? 
    ${period ? "AND DATEDIFF(CURDATE(), upload_date) < " + period : ""}
    `
    return await this.connector.query(sql, [userId]) as Answer[];
  }

  async getLastUserAnswers(n: number) {
    const sql = `
    SELECT * FROM answers 
    WHERE user_id = ? 
    ORDER BY upload_date 
    LIMIT(?)
    `
    return await this.connector.query(sql, [n]) as Answer[];
  }
}

export default new AnswerConnector();