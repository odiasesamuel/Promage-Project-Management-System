import db from "./db";

export const geEmployeeByEmail = (email: string) => {

  return db.prepare("SELECT * FROM employee WHERE employee_email = ?").get(email);
};
