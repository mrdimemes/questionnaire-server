import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";

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
}

export default new AnswerConnector();