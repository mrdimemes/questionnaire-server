import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { Tag } from "./models";

class TagConnector {
  private connector = MySQLConnector;

  async addTag(label: string) {
    const sql = "INSERT INTO tags (label) VALUES (?)";
    const resultHeader = await this.connector.query(
      sql, [label]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async findTag(id: number) {
    const sql = "SELECT * FROM tags WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Tag[];
    if (result.length === 0) throw Error("Tag not found");
    return result[0];
  }

  async getTags() {
    const sql = "SELECT * FROM tags";
    const result = await this.connector.query(sql) as Tag[];
    if (result.length === 0) throw Error("Tags table is empty!");
    return result;
  }

  async removeTag(id: number) {
    const sql = "DELETE FROM tags WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Tag not found");
    return resultHeader.affectedRows;
  }
}

export default new TagConnector();