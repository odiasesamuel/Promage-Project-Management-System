import db from "./db";
import { newProjectFormValueType } from "@/actions/project";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";
import { getQuarter } from "@/utils/dateUtils";

export const storeNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined) => {
  // Store Project
  const isManagerPartOfTeam = projectTeam?.some((item) => item.value === projectManagerId);
  let result;
  const stmtInsert = db.prepare(`
    INSERT INTO project (organisation_id, project_name, project_manager, due_date, status, progress, project_team)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);
  if (isManagerPartOfTeam) {
    // Store project with project team member if maanager is part of team
    result = stmtInsert.run(values.organisation_id, values.projectName, values.projectManager, values.dueDate, values.status, values.progress, JSON.stringify(projectTeam));
  } else {
    // Add manager to the project team if manager is not on the project team before storing project
    const projectTeamWithManger = [{ value: projectManagerId, label: values.projectManager }, ...(projectTeam ?? [])];
    result = stmtInsert.run(values.organisation_id, values.projectName, values.projectManager, values.dueDate, values.status, values.progress, JSON.stringify(projectTeamWithManger));
  }

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
    if (!isManagerPartOfTeam) {
      // Add project workload to project manager if manager was not included in the project team
      const stmtupdateProjectWorkload = db.prepare(`
        UPDATE project_workload
            SET no_of_project = no_of_project + 1
            WHERE organisation_id = ? AND employee_id = ?`);
      stmtupdateProjectWorkload.run(values.organisation_id, projectManagerId);
    }

    // Add project workload to each team member
    projectTeam?.forEach((employee) => {
      const stmtupdateProjectWorkload = db.prepare(`
        UPDATE project_workload
            SET no_of_project = no_of_project + 1
            WHERE organisation_id = ? AND employee_id = ?`);
      stmtupdateProjectWorkload.run(values.organisation_id, employee.value);
    });
  }

  return result;
};
