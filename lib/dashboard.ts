import db from "./db";

export const getMetrics = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM metric WHERE organization_id	 = ?");
  return stmt.all(organisation_id);
};

export const getProjectSummary = () => {
  const stmt = db.prepare("SELECT * FROM project");
  return stmt.all();
};

export const getProgress = () => {
  const stmt = db.prepare("SELECT * FROM progress");
  return stmt.all();
};

export const getTaskList = () => {
  const stmt = db.prepare("SELECT * FROM task_list");
  return stmt.all();
};

export const getProjectWorkLoad = () => {
  const stmt = db.prepare("SELECT * FROM project_workload");
  return stmt.all();
};
