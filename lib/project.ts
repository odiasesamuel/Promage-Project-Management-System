import db from "./db";
import { newProjectFormValueType } from "@/actions/project";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";
import { getQuarter } from "@/utils/dateUtils";

export const storeNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined) => {
  // Store Project
  const stmtInsert = db.prepare(`
    INSERT INTO project (organisation_id, project_name, project_manager, due_date, status, progress)
    VALUES (?, ?, ?, ?, ?, ?)`);
  const result = stmtInsert.run(values.organisation_id, values.projectName, values.projectManager, values.dueDate, values.status, values.progress);

  if (result.changes > 0) {
    // Update metric table and overview tab
    const currentDate = new Date();
    const currentQuarter = getQuarter(currentDate);
    const stmtUpdateMonthlyStats = db.prepare(`
      UPDATE metric
      SET project = project + 1,
          total_revenue = total_revenue + ?
      WHERE organisation_id = ? AND quarter = ?`);
    stmtUpdateMonthlyStats.run(values.revenue, values.organisation_id, currentQuarter);

    // Update Progress table and overall Progress tab
    let stmtUpdateStats;
    switch (values.status) {
      case "Completed":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              completed_project = completed_project + 1
          WHERE organisation_id = ?`);
        break;
      case "Delayed":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              delayed_project = delayed_project + 1
          WHERE organisation_id = ?`);
        break;
      case "On going":
        stmtUpdateStats = db.prepare(`
          UPDATE progress
          SET total_project = total_project + 1,
              ongoing_project = ongoing_project + 1
          WHERE organisation_id = ?`);
        break;
    }
    if (stmtUpdateStats) stmtUpdateStats.run(values.organisation_id);

    // Update project workload table and tab
    console.log(values.projectManager, projectTeam);
  }

  return result;
};
