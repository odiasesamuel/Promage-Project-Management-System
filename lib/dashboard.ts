import db from "./db";
import { pool } from "./supabaseClient";
import { MetricSignUpDetailsType } from "@/actions/auth-action";
import { getQuarter, getPreviousQuarter } from "@/utils/dateUtils";
import { EmployeeSignUpDetailsType, AdminDetailsType } from "@/actions/auth-action";

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

export const getTaskListAssignedToMe = (organisation_id: string, employee_id: string) => {
  const stmt = db.prepare("SELECT * FROM task_list WHERE organisation_id = ? AND assigned_to = ?");
  return stmt.all(organisation_id, employee_id);
};

export const getTaskListAssignedByMe = (organisation_id: string, employee_id: string) => {
  const stmt = db.prepare("SELECT * FROM task_list WHERE organisation_id = ? AND assigned_by = ?");
  return stmt.all(organisation_id, employee_id);
};

export const getProjectWorkLoad = (organisation_id: string) => {
  const stmt = db.prepare("SELECT * FROM project_workload WHERE organisation_id	 = ?");
  return stmt.all(organisation_id);
};

export const addMetricsOnSignUp = async (organisation_id: string, metric_info: MetricSignUpDetailsType, employeeDetails: (EmployeeSignUpDetailsType & { employee_id: string })[]) => {
  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);
  const previousQuarter = getPreviousQuarter(currentQuarter);
  const current_no_employee = employeeDetails.length + 1;

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const { last_quarter_revenue, last_quarter_project, last_quarter_time, last_quarter_resources } = metric_info;

  const stmtInsert = `
    INSERT INTO metric (organisation_id, quarter, total_revenue, project, time, resource)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const insertPromises = quarters.map((quarter) => {
    let total_revenue = 0;
    let project = 0;
    let time = 0;
    let resource = 0;

    if (quarter === previousQuarter) {
      total_revenue = last_quarter_revenue;
      project = last_quarter_project;
      time = last_quarter_time;
      resource = last_quarter_resources;
    } else if (quarter === currentQuarter) {
      resource = current_no_employee;
    }

    return pool.query(stmtInsert, [organisation_id, quarter, total_revenue, project, time, resource]);
  });

  await Promise.all(insertPromises);
};

export const addProgressDataOnSignUp = async (organisation_id: string) => {
  const stmtInsert = `
    INSERT INTO progress (organisation_id, total_project, completed_project, delayed_project, ongoing_project)
    VALUES ($1, $2, $3, $4, $5);
  `;

  await pool.query(stmtInsert, [organisation_id, 0, 0, 0, 0]);
};

export const addProjectWorkloadDataOnSignUp = async (organisation_id: string, adminDetails: AdminDetailsType, employeeDetails: (EmployeeSignUpDetailsType & { employee_id: string })[]) => {
  const { administrator_name, administrator_employee_id } = adminDetails;

  const stmtInsert = `
    INSERT INTO project_workload (organisation_id, employee_id, employee_name, no_of_project)
    VALUES ($1, $2, $3, $4);
  `;

  const insertPromises = [pool.query(stmtInsert, [organisation_id, administrator_employee_id, administrator_name, 0]), ...employeeDetails.map((employee) => pool.query(stmtInsert, [organisation_id, employee.employee_id, employee.employee_name, 0]))];

  await Promise.all(insertPromises);
};

export const addNoteDataOnSignUp = async (organisation_id: string, adminDetails: AdminDetailsType, employeeDetails: (EmployeeSignUpDetailsType & { employee_id: string })[]) => {
  const { administrator_employee_id } = adminDetails;

  const stmtInsert = `
    INSERT INTO task_note (organisation_id, employee_id, note)
    VALUES ($1, $2, $3);
  `;

  const insertPromises = [pool.query(stmtInsert, [organisation_id, administrator_employee_id, ""]), ...employeeDetails.map((employee) => pool.query(stmtInsert, [organisation_id, employee.employee_id, ""]))];

  await Promise.all(insertPromises);
};

export const updateMetricsAfterAddingSingleEmployee = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType) => {
  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);

  const stmtupdatequarter = db.prepare(`
      UPDATE metric
      SET resource = resource + 1
      WHERE organisation_id = ? AND quarter = ?
    `);

  stmtupdatequarter.run(organisation_id, currentQuarter);
};

export const addProjectWorkloadDataAfterAddingSingleEmployee = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType & { employee_id: string }) => {
  const { employee_name, employee_id } = employee_info;
  const stmtInsert = db.prepare(`
    INSERT INTO project_workload (organisation_id, employee_id, employee_name, no_of_project)
    VALUES (?, ?, ?, ?)`);

  stmtInsert.run(organisation_id, employee_id, employee_name, 0);
};
