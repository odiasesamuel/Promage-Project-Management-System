import { pool } from "./db";
import { newProjectFormValueType } from "@/actions/project";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";
import { getQuarter } from "@/utils/dateUtils";

const updateMetricProgressProjectworkloadTable = async (organisation_id: string, result: any) => {
  if (result.rowCount > 0) {
    // Update metric table
    const currentDate = new Date();
    const currentQuarter = getQuarter(currentDate);

    const projectResult = await pool.query(`SELECT COUNT(*) AS total_project FROM project WHERE organisation_id = $1`, [organisation_id]);
    const revenueResult = await pool.query(`SELECT SUM(revenue) AS total_revenue FROM project WHERE organisation_id = $1`, [organisation_id]);

    const projectCount = projectResult.rows[0].total_project || 0;
    const totalRevenue = revenueResult.rows[0].total_revenue || 0;

    const stmtUpdateMetric = `
      UPDATE metric
      SET project = $1,
          total_revenue = $2
      WHERE organisation_id = $3 AND quarter = $4
    `;
    await pool.query(stmtUpdateMetric, [projectCount, totalRevenue, organisation_id, currentQuarter]);

    // Update progress table
    const progressResult = await pool.query(
      `SELECT COUNT(*) AS total_project,
              SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_project,
              SUM(CASE WHEN status = 'Delayed' THEN 1 ELSE 0 END) AS delayed_project,
              SUM(CASE WHEN status = 'On going' THEN 1 ELSE 0 END) AS ongoing_project
       FROM project WHERE organisation_id = $1`,
      [organisation_id]
    );

    const { total_project, completed_project, delayed_project, ongoing_project } = progressResult.rows[0];

    const stmtUpdateProgress = `
      UPDATE progress
      SET total_project = $1,
          completed_project = $2,
          delayed_project = $3,
          ongoing_project = $4
      WHERE organisation_id = $5
    `;
    await pool.query(stmtUpdateProgress, [total_project, completed_project, delayed_project, ongoing_project, organisation_id]);

    // Update project workload table
    const stmtGetProjectWorkLoad = `
     WITH TeamMembers AS (
      SELECT 
        project.organisation_id,
        team_member.value->>'value' AS employee_id,
        team_member.value->>'label' AS employee_name
      FROM 
        project,
        jsonb_array_elements(project.project_team) AS team_member
      WHERE 
        project.organisation_id = $1
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
    `;

    const projectWorkLoadResult = await pool.query(stmtGetProjectWorkLoad, [organisation_id]);

    const stmtUpdateProjectWorkload = `
      UPDATE project_workload
      SET no_of_project = $1
      WHERE organisation_id = $2 AND employee_id = $3
    `;

    const workloadPromises = projectWorkLoadResult.rows.map(({ employee_id, number_of_projects }) => pool.query(stmtUpdateProjectWorkload, [number_of_projects, organisation_id, employee_id]));

    await Promise.all(workloadPromises);
  }
};

export const storeNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined) => {
  // Check if the manager is part of the team
  const isManagerPartOfTeam = projectTeam?.some((item) => item.value === projectManagerId);

  // Prepare the project team data
  const projectTeamData = isManagerPartOfTeam ? projectTeam : [{ value: projectManagerId!, label: values.projectManager }, ...(projectTeam ?? [])];

  const query = `
    INSERT INTO project (
      organisation_id, project_name, project_manager, revenue, due_date, status, progress, project_team
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const result = await pool.query(query, [values.organisation_id, values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeamData)]);

  // Call the function to update metric, progress, and project workload tables
  const organisation_id = values.organisation_id;
  await updateMetricProgressProjectworkloadTable(organisation_id, result);
};

export const reviewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined, project_id: number) => {
  // Determine if the manager is already part of the team
  const isManagerPartOfTeam = projectTeam?.some((item) => item.value === projectManagerId);

  // Prepare project team data
  const projectTeamData = isManagerPartOfTeam ? projectTeam : [{ value: projectManagerId!, label: values.projectManager }, ...(projectTeam ?? [])];

  const query = `
    UPDATE project
    SET project_name = $1,
        project_manager = $2,
        revenue = $3,
        due_date = $4,
        status = $5,
        progress = $6,
        project_team = $7
    WHERE project_id = $8 AND organisation_id = $9
  `;

  const result = await pool.query(query, [values.projectName, values.projectManager, values.revenue, values.dueDate, values.status, values.progress, JSON.stringify(projectTeamData), project_id, values.organisation_id]);

  const organisation_id = values.organisation_id;
  await updateMetricProgressProjectworkloadTable(organisation_id, result);
};

export const deleteProject = async (organisation_id: string, project_id: number | undefined) => {
  const deleteQuery = `DELETE FROM project WHERE organisation_id = $1 AND project_id = $2 RETURNING *`;
  const result = await pool.query(deleteQuery, [organisation_id, project_id]);

  updateMetricProgressProjectworkloadTable(organisation_id, result);
};
