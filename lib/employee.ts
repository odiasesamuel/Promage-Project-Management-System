import db from "./db";
import { OrganisationSignUpDetailsType, EmployeeSignUpDetailsType } from "@/actions/auth-action";
import { generateRandomCharID } from "@/utils/generateRandomCharID";

export const getOrganisationByEmail = (email: string) => {
  return db.prepare("SELECT * FROM organisation WHERE organisation_email = ?").get(email);
};

export const getEmployeeByEmail = (email: string) => {
  return db.prepare("SELECT * FROM employee WHERE employee_email = ?").all(email);
};

export const getEmployeeByEmployeeId = (email: string) => {
  return db.prepare("SELECT * FROM employee WHERE id = ?").get(email);
};

export const getAllEmployee = (organisation_id: string) => {
  return db.prepare("SELECT * FROM employee WHERE organisation_id = ?").all(organisation_id);
};

export const createOrganisationAccount = async (organisation_info: OrganisationSignUpDetailsType) => {
  const { organisation_name, organisation_email } = organisation_info;
  const orgNum = Math.floor(Math.random() * 900) + 100;
  const orgChar = organisation_name.substring(0, 3).toUpperCase();
  const organisation_id = `${orgChar}${orgNum}`;
  const stmtInsert = db.prepare(`
  INSERT INTO organisation (organisation_id, organisation_name, organisation_email)
  VALUES (?, ?, ?)`);
  stmtInsert.run(organisation_id, organisation_name, organisation_email);

  return organisation_id;
};

export const createAdminEmployeeAccount = async (organisation_id: string, organisation_info: OrganisationSignUpDetailsType) => {
  const { administrator_name, administrator_email } = organisation_info;
  const adminNum = Math.floor(Math.random() * 900) + 100;
  const adminChar = generateRandomCharID(administrator_name);
  const administrator_employee_id = `${adminChar}${adminNum}`;
  const stmtInsert = db.prepare(`
   INSERT INTO employee (id, organisation_id, employee_name, employee_email, job_title)
   VALUES (?, ?, ?, ?, ?)`);
  stmtInsert.run(administrator_employee_id, organisation_id, administrator_name, administrator_email, "Administrator");

  return {
    administrator_name,
    administrator_email,
    administrator_employee_id,
  };
};

export const createEmployeeAccount = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType[]) => {
  let employee_details: (EmployeeSignUpDetailsType & { employee_id: string })[] = [];
  employee_info.forEach((employee) => {
    const { employee_name, employee_email, job_title } = employee;
    const empNum = Math.floor(Math.random() * 900) + 100;
    const empChar = generateRandomCharID(employee_name);
    const employee_id = `${empChar}${empNum}`;
    const stmtInsert = db.prepare(`
     INSERT INTO employee (id, organisation_id, employee_name, employee_email, job_title)
     VALUES (?, ?, ?, ?, ?)`);
    stmtInsert.run(employee_id, organisation_id, employee_name, employee_email, job_title);

    employee_details.push({
      employee_name,
      employee_email,
      employee_id,
      job_title,
    });
  });

  return employee_details;
};
