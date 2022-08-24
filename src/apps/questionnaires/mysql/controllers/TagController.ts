import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { Tag } from "../models";

class TagController {
  private connector = MySQLConnector;

  async addTag(label: string) {
    const sql = "INSERT INTO tags (label) VALUES (?)";
    await this.connector.query(sql, [label]);
  }

  async findTag(id: number) {
    const sql = "SELECT * FROM tags WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as Tag[];
    if (result.length === 0) throw Error("Tag not found");
    return result[0];
  }

  async removeTag(id: number) {
    const sql = "DELETE FROM tags WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("Tag not found");
  }
}

export default new TagController();