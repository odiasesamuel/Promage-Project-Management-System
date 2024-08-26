import { NextResponse } from "next/server";
import { pool } from "@/lib/supabaseClient";

export const GET = async () => {
  const stmt = `SELECT organisation.organisation_name, employee.employee_name
  FROM organisation
  JOIN employee ON organisation.organisation_id = employee.organisation_id;
`;

  const data = await pool.query(stmt, []);
  return NextResponse.json(data.rows);
};
