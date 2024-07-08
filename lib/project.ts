import db from "./db";
import { ValueType } from "@/actions/project";

export const storeNewProject = (values: ValueType) => {
  // throw new Error("Failed to create new project");
  const stmtInsert = db.prepare(`
    INSERT INTO project (name, projectManager, dueDate, status, progress)
    VALUES (?, ?, ?, ?, ?)`);
  const result = stmtInsert.run(values.projectName, values.projectManager, values.dueDate, values.status, values.progress);

  if (result.changes > 0) {
    const stmtUpdateMonthlyStats = db.prepare(`
      UPDATE metric
      SET project = project + 1,
          total_revenue = total_revenue + ?
      WHERE month = 'current_month'`);
    stmtUpdateMonthlyStats.run(values.revenue);

    let stmtUpdateStats;
    switch (values.status) {
      case "Completed":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              completed_project = completed_project + 1
          WHERE id = 1`);
        break;
      case "Delayed":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              delayed_project = delayed_project + 1
          WHERE id = 1`);
        break;
      case "On going":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              ongoing_project = ongoing_project + 1
          WHERE id = 1`);
        break;
    }

    if (stmtUpdateStats) {
      stmtUpdateStats.run();
    }
  }

  return result;
};
