import db from "./db";

export function geEmployeeByEmail(email) {
  return db.prepare('SELECT * FROM employee WHERE email = ?').get(email);
}
