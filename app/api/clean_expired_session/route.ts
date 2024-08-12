import { NextResponse } from "next/server";
import { deleteExpiredSessions } from "@/lib/auth";

export const GET = async () => {
  deleteExpiredSessions();
  return NextResponse.json("Expired sessions cleared");
};
