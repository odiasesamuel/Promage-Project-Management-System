import db from "./db";

export const getMetrics = () => {
  const stmt = db.prepare("SELECT * FROM metric");
  return stmt.all();
};

export const getProjectSummary = () => {
  const stmt = db.prepare("SELECT * FROM project");
  return stmt.all();
};

export const getProgress = () => {
  const stmt = db.prepare('SELECT * FROM progress');
  return stmt.all();
}

export const getTaskList = () => {
  const stmt = db.prepare('SELECT * FROM task_list');
  return stmt.all();
}

export const getProjectWorkLoad = () => {
  const stmt = db.prepare('SELECT * FROM project_workload');
  return stmt.all();
}