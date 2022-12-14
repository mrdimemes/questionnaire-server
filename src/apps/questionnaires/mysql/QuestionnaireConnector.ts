import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Questionnaire, Question, Field } from "./models";
import { SortOption } from "../models";
import { getCardsSortOrder, getCardsSearch, getCardsTagFilter } from "./helpers";


class QuestionnaireConnector {
  private connector = MySQLConnector;

  async addField(questionId: number, text: string) {
    const sql = "INSERT INTO fields (question_id, field_text) VALUES (?, ?)";
    const resultHeader = await this.connector.query(
      sql, [questionId, text]) as ResultSetHeader;
    return resultHeader.insertId;
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
    return resultHeader.affectedRows;
  }

  async removeFieldsByQuestionId(questionId: number) {
    const sql = "DELETE FROM fields WHERE question_id = ?";
    const resultHeader = await this.connector.query(
      sql, [questionId]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Fields not found");
    return resultHeader.affectedRows;
  }

  async addQuestion(
    questionnaireId: number,
    questionType: string,
    text: string,
    isRequired: boolean
  ) {
    const sql = "INSERT INTO questions " +
      "(questionnaire_id, question_type, question_text, is_required) " +
      "VALUES (?, ?, ?, ?)";
    const resultHeader = await this.connector.query(sql, [
      questionnaireId,
      questionType,
      text,
      Number(isRequired)
    ]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async findQuestion(id: number) {
    const sql = "SELECT * FROM questions WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Question[];
    if (result.length === 0) throw Error("Question not found");
    return result[0];
  }

  async findQuestionnaireQuestions(questionnaireId: number) {
    const sql = "SELECT * FROM questions WHERE questionnaire_id = ?";
    return await this.connector.query(
      sql, [questionnaireId]) as Question[];
  }

  async removeQuestion(id: number) {
    const sql = "DELETE FROM questions WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Question not found");
    return resultHeader.affectedRows;
  }

  async addQuestionnaire(label: string, about: string) {
    const sql = "INSERT INTO questionnaires (label, about) VALUES (?, ?)";
    const resultHeader = await this.connector.query(
      sql, [label, about]) as ResultSetHeader;
    return resultHeader.insertId;
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
    return resultHeader.affectedRows;
  }

  async getQuestionnairesBunch(
    sortOption: SortOption | null,
    searchPhrase: string,
    filterTag: number | null,
    offset: number,
    rowCount: number,
  ) {
    const order = getCardsSortOrder(sortOption);
    const search = getCardsSearch(searchPhrase);
    const tagFilter = getCardsTagFilter(filterTag);
    const tagJoin = `
      JOIN questionnaires_tags 
      ON questionnaires.id = questionnaires_tags.questionnaire_id
    `;
    const sql = `
      SELECT * FROM questionnaires 
      ${filterTag ? tagJoin : ""} 
      ${(search.length !== 0 || filterTag) ? "WHERE" : ""} ${search} 
      ${(search.length !== 0 && filterTag) ?  "AND" : ""} ${tagFilter} 
      ${order} 
      LIMIT ?, ?
    `;
    return await this.connector
      .query(sql, [offset, rowCount]) as Questionnaire[];
  }

  async getQuestionnairesCount(searchPhrase: string, filterTag: number | null) {
    const tagJoin = `
      JOIN questionnaires_tags 
      ON questionnaires.id = questionnaires_tags.questionnaire_id
    `;
    const search = getCardsSearch(searchPhrase);
    const tagFilter = getCardsTagFilter(filterTag);
    const sql = `
      SELECT COUNT(*) FROM questionnaires 
      ${filterTag ? tagJoin : ""} 
      ${(search.length !== 0 || filterTag) ? "WHERE" : ""} ${search} 
      ${(search.length !== 0 && filterTag) ?  "AND" : ""} ${tagFilter}
    `;
    const result = await this.connector.query(sql) as RowDataPacket;
    return result[0]["COUNT(*)"] as number;
  }
}

export default new QuestionnaireConnector();