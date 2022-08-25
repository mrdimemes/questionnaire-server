import dotenv from "dotenv";
import mysql, { Pool } from "mysql2/promise";

dotenv.config();

export class MySQLConnector {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async query(query: string, paramsArray?: Array<string | number | null>) {
    const [rows, _fields] = await this.pool.query(query, paramsArray);
    return rows;
  }
}

export default new MySQLConnector();