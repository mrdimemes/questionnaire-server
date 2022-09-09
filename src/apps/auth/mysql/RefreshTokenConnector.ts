import MySQLConnector from "src/apps/mysql-connector";
import { ResultSetHeader } from "mysql2/promise";
import { RefreshToken } from "./models";
import { ApiError } from "src/exceptions";

class RefreshTokenConnector {
  private connector = MySQLConnector;

  async addRefreshToken(userId: number, token: string) {
    const sql = "INSERT INTO refresh_tokens (user_id, jwt) VALUES (?, ?, ?)";
    const resultHeader = await this.connector.query(
      sql, [userId, token]) as ResultSetHeader;
    return resultHeader.insertId;
  }

  async findRefreshTokenById(id: number) {
    const sql = "SELECT * FROM refresh_tokens WHERE id = ?";
    const result = await this.connector.query(sql, [id]) as RefreshToken[];
    if (result.length === 0) {
      throw ApiError.BadRequestError("Токен не найден");
    }
    return result[0];
  }

  async findRefreshToken(token: string) {
    const sql = "SELECT * FROM refresh_tokens WHERE jwt = ?";
    const result = await this.connector.query(sql, [token]) as RefreshToken[];
    if (result.length === 0) {
      throw ApiError.BadRequestError("Токен не найден");
    }
    return result[0];
  }

  async removeRefreshTokenById(id: number) {
    const sql = "DELETE FROM refresh_tokens WHERE id = ?";
    const resultHeader = await this.connector.query(
      sql, [id]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
      throw ApiError.BadRequestError("Токен не найден");
    }
    return resultHeader.affectedRows;
  }

  async removeRefreshToken(token: string) {
    const sql = "DELETE FROM refresh_tokens WHERE jwt = ?";
    const resultHeader = await this.connector.query(
      sql, [token]) as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
      throw ApiError.BadRequestError("Токен не найден");
    }
    return resultHeader.affectedRows;
  }

  async getUserTokens(userId: number) {
    const sql = "SELECT * FROM refresh_tokens WHERE user_id = ?";
    return await this.connector.query(sql, [userId]) as RefreshToken[];
  }
}

export default new RefreshTokenConnector();