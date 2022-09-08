import { MySQLConnector } from "src/apps/mysql-connector";

export const createTables = async (connector: MySQLConnector) => {
  await createUsersTable(connector);
  await createRefreshTokensTable(connector);
}

const createUsersTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE users (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "email VARCHAR(40) NOT NULL UNIQUE, " +
    "name VARCHAR(40) NOT NULL, " +
    "password_hash VARCHAR(50) NOT NULL, " +
    "is_admin BOOLEAN NOT NULL DEFAULT 0 )"
  );
}

const createRefreshTokensTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE refresh_tokens (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "user_id INT NOT NULL, " +
    "upload_date DATE NOT NULL DEFAULT (CURRENT_DATE), " +
    "jwt VARCHAR(400) NOT NULL, " +
    "FOREIGN KEY (user_id) REFERENCES users(id) )"
  );
}