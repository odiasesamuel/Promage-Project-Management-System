import { pool } from "./db";
import { OrganisationSignUpDetailsType, EmployeeSignUpDetailsType } from "@/actions/auth-action";
import { generateRandomCharID } from "@/utils/generateRandomCharID";
import { removeExistingEmployeeFormType } from "@/actions/employee";
import { getQuarter } from "@/utils/dateUtils";

export const getOrganisationByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM organisation WHERE organisation_email = $1", [email]);
  return result.rows[0];
};

export const getOrganisationByOrganisationId = async (id: string) => {
  const result = await pool.query("SELECT * FROM organisation WHERE organisation_id = $1", [id]);
  return result.rows[0];
};

export const getEmployeeByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM employee WHERE employee_email = $1", [email]);
  return result.rows;
};

export const getEmployeeByEmployeeId = async (id: string) => {
  const result = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);
  return result.rows[0];
};

export const getAllEmployee = async (organisation_id: string) => {
  const result = await pool.query("SELECT * FROM employee WHERE organisation_id = $1", [organisation_id]);
  return result.rows;
};

export const createOrganisationAccount = async (organisation_info: OrganisationSignUpDetailsType) => {
  const { organisation_name, organisation_email } = organisation_info;
  const orgNum = Math.floor(Math.random() * 900) + 100;
  const orgChar = organisation_name.substring(0, 3).toUpperCase();
  const organisation_id = `${orgChar}${orgNum}`;
  const stmtInsert = `
  INSERT INTO organisation (organisation_id, organisation_name, organisation_email)
  VALUES ($1, $2, $3)`;
  await pool.query(stmtInsert, [organisation_id, organisation_name, organisation_email]);

  return organisation_id;
};

export const createAdminEmployeeAccount = async (organisation_id: string, organisation_info: OrganisationSignUpDetailsType) => {
  const { administrator_name, administrator_email } = organisation_info;
  const adminNum = Math.floor(Math.random() * 900) + 100;
  const adminChar = generateRandomCharID(administrator_name);
  const administrator_employee_id = `${adminChar}${adminNum}`;
  const stmtInsert = `
   INSERT INTO employee (id, organisation_id, employee_name, employee_email, job_title)
   VALUES ($1, $2, $3, $4, $5)`;

  await pool.query(stmtInsert, [administrator_employee_id, organisation_id, administrator_name, administrator_email, "Administrator"]);

  return {
    administrator_name,
    administrator_email,
    administrator_employee_id,
  };
};

export const createEmployeeAccount = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType[]) => {
  let employee_details: (EmployeeSignUpDetailsType & { employee_id: string })[] = [];

  const insertPromises = employee_info.map(async (employee) => {
    const { employee_name, employee_email, job_title } = employee;
    const empNum = Math.floor(Math.random() * 900) + 100;
    const empChar = generateRandomCharID(employee_name);
    const employee_id = `${empChar}${empNum}`;

    const stmtInsert = `
      INSERT INTO employee (id, organisation_id, employee_name, employee_email, job_title)
      VALUES ($1, $2, $3, $4, $5);
    `;

    await pool.query(stmtInsert, [employee_id, organisation_id, employee_name, employee_email, job_title]);

    employee_details.push({
      employee_name,
      employee_email,
      employee_id,
      job_title,
    });
  });

  await Promise.all(insertPromises);

  return employee_details;
};

export const createSingleEmployeeAccount = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType) => {
  const { employee_name, employee_email, job_title } = employee_info;
  const empNum = Math.floor(Math.random() * 900) + 100;
  const empChar = generateRandomCharID(employee_name);
  const employee_id = `${empChar}${empNum}`;

  const stmtInsert = `
    INSERT INTO employee (id, organisation_id, employee_name, employee_email, job_title)
    VALUES ($1, $2, $3, $4, $5);
  `;

  await pool.query(stmtInsert, [employee_id, organisation_id, employee_name, employee_email, job_title]);

  return {
    employee_name,
    employee_email,
    employee_id,
    job_title,
  };
};

export const deleteEmployeeAccount = async (organisation_id: string, removedEmployeeInfo: removeExistingEmployeeFormType) => {
  const currentDate = new Date();
  const currentQuarter = getQuarter(currentDate);

  const stmtDelete = `
    DELETE FROM employee
    WHERE organisation_id = $1 AND id = $2;
  `;
  const stmtUpdateMetric = `
    UPDATE metric
    SET resource = resource - 1
    WHERE organisation_id = $1 AND quarter = $2;
  `;

  await pool.query(stmtDelete, [organisation_id, removedEmployeeInfo.employee_id]);
  await pool.query(stmtUpdateMetric, [organisation_id, currentQuarter]);
};

export const clearOrganisationData = async (organisation_id: string) => {
  // Update metrics data to 0
  const stmtClearMetricData = `
    UPDATE metric
    SET total_revenue = 0, project = 0, time = 0
    WHERE organisation_id = $1;
  `;

  // Clear Project Data
  const stmtClearProjectData = `
    DELETE FROM project
    WHERE organisation_id = $1;
  `;

  // Update progress data to 0
  const stmtClearProgressData = `
    UPDATE progress
    SET total_project = 0, completed_project = 0, delayed_project = 0, ongoing_project = 0
    WHERE organisation_id = $1;
  `;

  // Clear Task
  const stmtClearTask = `
    DELETE FROM task_list
    WHERE organisation_id = $1;
  `;

  // Clear Notes
  const stmtClearNote = `
    UPDATE task_note
    SET note = ''
    WHERE organisation_id = $1;
  `;

  // Set Project workload to 0
  const stmtClearProjectWorkLoad = `
    UPDATE project_workload
    SET no_of_project = 0
    WHERE organisation_id = $1;
  `;

  await pool.query(stmtClearMetricData, [organisation_id]);
  await pool.query(stmtClearProjectData, [organisation_id]);
  await pool.query(stmtClearProgressData, [organisation_id]);
  await pool.query(stmtClearTask, [organisation_id]);
  await pool.query(stmtClearNote, [organisation_id]);
  await pool.query(stmtClearProjectWorkLoad, [organisation_id]);
};
