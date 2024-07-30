import db from "./db";
import { newProjectFormValueType } from "@/actions/project";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";
import { getQuarter } from "@/utils/dateUtils";

type ProjectWorkloadType = {
  employee_name: string;
  employee_id: string;
  number_of_projects: number;
};

const updateMetricProgressProjectworkloadTable = async (organisation_id: string, result: any) => {
  if (result.changes > 0) {
    // Update metric table table
    const currentDate = new Date();
    const currentQuarter = getQuarter(currentDate);
    const project = db.prepare(`SELECT COUNT(*) AS total_project FROM project WHERE organisation_id = ?`).get(organisation_id);
    const revenue = db.prepare(`SELECT SUM(revenue) AS total_revenue FROM project WHERE organisation_id = ?`).get(organisation_id);
    const stmtUpdateMonthlyStats = db.prepare(`
      UPDATE metric
      SET project = ?,
          total_revenue = ?
      WHERE organisation_id = ? AND quarter = ?`);
    stmtUpdateMonthlyStats.run(project.total_project, revenue.total_revenue, organisation_id, currentQuarter);

    // Update Progress table
    const progress = db
      .prepare(
        `SELECT COUNT(*) AS total_project,
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_project,
          SUM(CASE WHEN status = 'Delayed' THEN 1 ELSE 0 END) AS delayed_project,
          SUM(CASE WHEN status = 'On going' THEN 1 ELSE 0 END) AS ongoing_project
        FROM project WHERE organisation_id = ?`
      )
      .get(organisation_id);
    const stmtUpdateStats = db.prepare(`
      UPDATE progress
      SET total_project = ?,
          completed_project = ?,
          delayed_project = ?,
          ongoing_project = ?
      WHERE organisation_id = ?`);
    stmtUpdateStats.run(progress.total_project, progress.completed_project, progress.delayed_project, progress.ongoing_project, organisation_id);

    // update project workload table
    const stmtgetProjectWorkLoad = db.prepare(`
      WITH TeamMembers AS (
        SELECT 
            json_extract(value, '$.value') AS employee_id,
            json_extract(value, '$.label') AS employee_name
        FROM 
            project,
            json_each(project.project_team)
        WHERE 
            project.organisation_id = ?
      )
      SELECT 
          employee_name,
          employee_id,
          COUNT(*) AS number_of_projects
      FROM 
          TeamMembers
      GROUP BY 
          employee_id, employee_name
      ORDER BY 
          number_of_projects DESC;
    `);

    const getProjectWorkLoad: ProjectWorkloadType[] = stmtgetProjectWorkLoad.all(organisation_id);
    console.log(getProjectWorkLoad);

    const stmtupdateProjectWorkload = db.prepare(`
      UPDATE project_workload
      SET no_of_project = ?
      WHERE organisation_id = ? AND employee_id = ?
    `);

    getProjectWorkLoad.forEach(({ employee_id, number_of_projects }) => {
      stmtupdateProjectWorkload.run(number_of_projects, organisation_id, employee_id);
    });
  }
};

export const storeNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined) => {
  // Store Project
  const isManagerPartOfTeam = projectTeam?.some((item) => item.value === projectManagerId);
  let result;
  const stmtInsert = db.prepare(`
   INSERT INTO project (organisation_id, project_name, project_manager, revenue, due_date, status, progress, project_team)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  if (isManagerPartOfTeam) {
    // Store project with project team member if maanager is part of team
    result = stmtInsert.run(values.organisation_id, values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeam));
  } else {
    // Add manager to the project team if manager is not on the project team before storing project
    const projectTeamWithManger = [{ value: projectManagerId, label: values.projectManager }, ...(projectTeam ?? [])];
    result = stmtInsert.run(values.organisation_id, values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeamWithManger));
  }

  const organisation_id = values.organisation_id;
  updateMetricProgressProjectworkloadTable(organisation_id, result);
};

export const reviewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined, project_id: number) => {
  // update Project
  const isManagerPartOfTeam = projectTeam?.some((item) => item.value === projectManagerId);
  let result;
  const stmtInsert = db.prepare(`
   UPDATE project
   SET project_name = ?,
      project_manager = ?,
      revenue = ?,
      due_date = ?,
      status = ?,
      progress = ?,
      project_team = ?
    WHERE project_id = ? AND organisation_id = ?
      `);
  if (isManagerPartOfTeam) {
    // update project with project team member if maanager is part of team
    result = stmtInsert.run(values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeam), project_id, values.organisation_id);
  } else {
    // Add manager to the project team if manager is not on the project team before updating project
    const projectTeamWithManger = [{ value: projectManagerId, label: values.projectManager }, ...(projectTeam ?? [])];
    result = stmtInsert.run(values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeamWithManger), project_id, values.organisation_id);
  }

  const organisation_id = values.organisation_id;
  updateMetricProgressProjectworkloadTable(organisation_id, result);
};

export const deleteProject = async (organisation_id: string, project_id: number | undefined) => {
  const stmtDeleteProject = db.prepare(`DELETE FROM project WHERE organisation_id = ? AND project_id = ?;
`);
  const result = stmtDeleteProject.run(organisation_id, project_id);

  updateMetricProgressProjectworkloadTable(organisation_id, result);
};
