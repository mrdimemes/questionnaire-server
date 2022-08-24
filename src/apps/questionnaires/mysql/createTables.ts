import { MySQLConnector } from "src/apps/mysql-connector";

export const createTables = async (connector: MySQLConnector) => {
  await createQuestionnairesTable(connector);
  await createQuestionsTable(connector);
  await createFieldsTable(connector);
  await createTagsTable(connector);
  await createQuestionnairesTagsTable(connector);
}

const createQuestionnairesTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE questionnaires (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "label VARCHAR(200) NOT NULL, " +
    "about VARCHAR(2000) NOT NULL )"
  );
}

const createQuestionsTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE questions (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "questionnaire_id INT NOT NULL, " +
    "question_type VARCHAR(30) NOT NULL, " +
    "question_text VARCHAR(600) NOT NULL, " +
    "is_required BOOLEAN NOT NULL, " +
    "FOREIGN KEY (questionnaire_id) REFERENCES questionnaires(id) )"
  );
}

const createFieldsTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE fields (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "question_id INT NOT NULL, " +
    "field_text VARCHAR(100) NOT NULL, " +
    "FOREIGN KEY (question_id) REFERENCES questions(id) )"
  );
}

const createTagsTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE tags (" +
    "id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, " +
    "label VARCHAR(30) NOT NULL )"
  );
}

const createQuestionnairesTagsTable = async (connector: MySQLConnector) => {
  connector.query(
    "CREATE TABLE questionnaires_tags (" +
    "questionnaire_id INT NOT NULL, " +
    "tag_id INT NOT NULL )"
  );
}