const sql = require("better-sqlite3");

const db = sql("project.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS metric (
    month TEXT PRIMARY KEY,
    total_revenue INTEGER,
    project INTEGER,
    time INTEGER,
    resource INTEGER
  );
`);

db.exec(`
CREATE TABLE IF NOT EXISTS project (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT,
    project_manager TEXT,
    due_date DATE,
    status TEXT,
    progress INTEGER
);
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS progress(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_project INTEGER,
    completed_project INTEGER,
    delayed_project INTEGER,
    ongoing_project INTEGER
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS task_list(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    checked TEXT,
    approval TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS project_workload (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_name TEXT,
    no_of_project INTEGER
  );
`);

export default db;
