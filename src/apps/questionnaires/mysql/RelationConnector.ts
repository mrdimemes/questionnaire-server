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

  async findQuestionnaireTagRelationsByQuestionnaireId(
    questionnaire_id: number
  ) {
    const sql = "SELECT * FROM questionnaires_tags WHERE questionnaire_id = ?";
    return await this.connector.query(
      sql, [questionnaire_id]) as QuestionnaireTagRelation[];
  }

  async findQuestionnaireTagRelationsByTagId(tag_id: number) {
    const sql = "SELECT * FROM questionnaires_tags WHERE tag_id = ?";
    return await this.connector.query(
      sql, [tag_id]) as QuestionnaireTagRelation[];
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

  async removeQuestionnaireTagRelationsByQuestionnaireId(
    questionnaire_id: number
  ) {
    const sql = "DELETE FROM questionnaires_tags WHERE questionnaire_id = ?";
    const resultHeader = await this.connector.query(
      sql, [questionnaire_id]) as ResultSetHeader;
    return resultHeader.affectedRows;
  }

  async removeQuestionnaireTagRelationsByTagId(tag_id: number) {
    const sql = "DELETE FROM questionnaires_tags WHERE tag_id = ?";
    const resultHeader = await this.connector.query(
      sql, [tag_id]) as ResultSetHeader;
    return resultHeader.affectedRows;
  }
}

export default new RelationConnector();