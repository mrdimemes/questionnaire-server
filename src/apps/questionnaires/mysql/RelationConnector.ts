import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { QuestionnaireTagRelation } from "./models";

class RelationConnector {
  private connector = MySQLConnector;

  async addQuestionnaireTagRelation(questionnaire_id: number, tag_id: number) {
    const sql = "INSERT INTO questionnaires_tags " +
      "(questionnaire_id, tag_id) VALUES (?, ?)";
    await this.connector.query(sql, [questionnaire_id, tag_id]);
  }

  async findTagsByQuestionnaire(questionnaire_id: number) {
    const sql = "SELECT * FROM questionnaires_tags WHERE questionnaire_id = ?";
    const result = await this.connector.query(
      sql, [questionnaire_id]) as QuestionnaireTagRelation[];
    if (result.length === 0) throw Error("Tags not found");
    return result;
  }

  async findQuestionnairesByTag(tag_id: number) {
    const sql = "SELECT * FROM questionnaires_tags WHERE tag_id = ?";
    const result = await this.connector.query(
      sql, [tag_id]) as QuestionnaireTagRelation[];
    if (result.length === 0) throw Error("Questionnaires not found");
    return result;
  }

  async removeQuestionnaireTagRelation(
    questionnaire_id: number,
    tag_id: number
  ) {
    const sql = "DELETE FROM questionnaires_tags " +
      "WHERE questionnaire_id = ? AND tag_id = ?";
    const resultHeader = await this.connector.query(
      sql, [questionnaire_id, tag_id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Relation not found");
  }

  async removeTagsByQuestionnaire(questionnaire_id: number) {
    const sql = "DELETE FROM questionnaires_tags WHERE questionnaire_id = ?";
    const resultHeader = await this.connector.query(
      sql, [questionnaire_id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Relations not found");
    return resultHeader.affectedRows;
  }

  async removeQuestionnairesByTag(tag_id: number) {
    const sql = "DELETE FROM questionnaires_tags WHERE tag_id = ?";
    const resultHeader = await this.connector.query(
      sql, [tag_id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Relations not found");
    return resultHeader.affectedRows;
  }
}

export default new RelationConnector();