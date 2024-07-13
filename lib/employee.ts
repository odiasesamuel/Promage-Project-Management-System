import db from "./db";

export const getEmployeeByEmail = (email: string) => {
  return db.prepare("SELECT * FROM employee WHERE employee_email = ?").get(email);
};

export const getEmployeeByEmployeeId = (email: string) => {
  return db.prepare("SELECT * FROM employee WHERE id = ?").get(email);
};
