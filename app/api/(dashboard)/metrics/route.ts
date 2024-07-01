import { NextResponse } from "next/server";
import db from "@/lib/db";

export const GET = async () => {
  const stmt = db.prepare("SELECT * FROM metric");
  const data = stmt.all();
  return NextResponse.json(data);
};
