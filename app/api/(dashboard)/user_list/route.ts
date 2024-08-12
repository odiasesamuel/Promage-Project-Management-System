import { NextResponse } from "next/server";
import db from "@/lib/db";

export const GET = async () => {
  const stmt = db.prepare(`SELECT organisation.organisation_name, employee.employee_name
  FROM organisation
  JOIN employee ON organisation.organisation_id = employee.organisation_id;
`);
  const data = stmt.all();
  return NextResponse.json(data);
};
