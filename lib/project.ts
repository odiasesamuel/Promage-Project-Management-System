import db from "./db";
import { ValueType } from "@/actions/project";

export const storeNewProject = (values: ValueType) => {
  throw new Error('Simulated error for testing');
  const stmt = db.prepare(`
    INSERT INTO project (name, projectManager, dueDate, status, progress)
    VALUES (?, ?, ?, ?, ?)`);
  return stmt.run(values.projectName, values.projectManager, values.dueDate, values.status, values.progress);
};
