import db from "./db";
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

  const stmtInsert = db.prepare(`
    INSERT INTO metric (organisation_id, quarter, total_revenue, project, time, resource)
    VALUES (?, ?, ?, ?, ?, ?)`);

  quarters.forEach((quarter) => {
    if (quarter === previousQuarter) {
      stmtInsert.run(organisation_id, quarter, last_quarter_revenue, last_quarter_project, last_quarter_time, last_quarter_resources);
    } else if (quarter === currentQuarter) {
      stmtInsert.run(organisation_id, currentQuarter, 0, 0, 0, current_no_employee);
    } else {
      stmtInsert.run(organisation_id, quarter, 0, 0, 0, 0);
    }
  });
};

export const addProgressDataOnSignUp = async (organisation_id: string) => {
  const stmtInsert = db.prepare(`
    INSERT INTO progress (organisation_id, total_project, completed_project, delayed_project, ongoing_project)
    VALUES (?, ?, ?, ?, ?)`);

  stmtInsert.run(organisation_id, 0, 0, 0, 0);
};

export const addProjectWorkloadDataOnSignUp = async (organisation_id: string, adminDetails: AdminDetailsType, employeeDetails: (EmployeeSignUpDetailsType & { employee_id: string })[]) => {
  const { administrator_name, administrator_employee_id } = adminDetails;
  const stmtInsert = db.prepare(`
    INSERT INTO project_workload (organisation_id, employee_id, employee_name, no_of_project)
    VALUES (?, ?, ?, ?)`);

  stmtInsert.run(organisation_id, administrator_employee_id, administrator_name, 0);

  employeeDetails.forEach((employee) => {
    const { employee_name, employee_id } = employee;
    const stmtInsert = db.prepare(`
      INSERT INTO project_workload (organisation_id, employee_id, employee_name, no_of_project)
      VALUES (?, ?, ?, ?)`);

    stmtInsert.run(organisation_id, employee_id, employee_name, 0);
  });
};

export const addNoteDataOnSignUp = async (organisation_id: string, adminDetails: AdminDetailsType, employeeDetails: (EmployeeSignUpDetailsType & { employee_id: string })[]) => {
  const { administrator_employee_id } = adminDetails;
  const stmtInsert = db.prepare(`
    INSERT INTO task_note (organisation_id, employee_id, note)
    VALUES (?, ?, ?)`);

  stmtInsert.run(organisation_id, administrator_employee_id, "");

  employeeDetails.forEach((employee) => {
    const { employee_name, employee_id } = employee;
    const stmtInsert = db.prepare(`
    INSERT INTO task_note (organisation_id, employee_id, note)
    VALUES (?, ?, ?)`);

    stmtInsert.run(organisation_id, employee_id, "");
  });
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
