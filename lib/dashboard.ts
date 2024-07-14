import db from "./db";

export const getMetrics = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM metric WHERE organisation_id	 = ?");
  return stmt.all(organisation_id);
};

export const getProjectSummary = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM project WHERE organisation_id = ?");
  return stmt.all(organisation_id);
};

export const getProgress = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM progress WHERE organisation_id = ?");
  return stmt.all(organisation_id);
};

export const getTaskList = (employee_id: string) => {
  const stmt = db.prepare("SELECT * FROM task_list WHERE assigned_to = ?");
  return stmt.all(employee_id);
};

export const getProjectWorkLoad = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM project_workload WHERE organisation_id	 = ?");
  return stmt.all(organisation_id);
};
