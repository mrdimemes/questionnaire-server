import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { User } from "./models";

class UserConnector {
  private connector = MySQLConnector;

  async addUser(email: string, name: string, passwordHash: string) {
    const sql = "INSERT INTO users (email, name, password_hash) " +
      "VALUES (?, ?, ?)";
    const resultHeader = await this.connector.query(
      sql, [email, name, passwordHash]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async findUser(id: number) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as User[];
    if (result.length === 0) throw Error("User not found");
    return result[0];
  }

  async findUserByEmail(email: string) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const result = await this.connector.query(sql, [email]) as User[];
    if (result.length === 0) throw Error("User not found");
    return result[0];
  }

  async removeUser(id: number) {
    const sql = "DELETE FROM users WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("User not found");
    return resultHeader.affectedRows;
  }

  async giveAdminRights(id: number) {
    const sql = "UPDATE users SET is_admin = 1 WHERE user_id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("User not found");
    return resultHeader.affectedRows;
  }

  async removeAdminRights(id: number) {
    const sql = "UPDATE users SET is_admin = 0 WHERE user_id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) throw Error("User not found");
    return resultHeader.affectedRows;
  }
}

export default new UserConnector();