"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { geEmployeeByEmail } from "@/lib/user";

export type ValueType = {
  email: string;
  employee_id: string;
};

export const login = async (values: ValueType) => {
  try {
    // await storeNewProject(values);
    const existingUser = geEmployeeByEmail(values.email);
  } catch (error) {
    throw new Error("Failed to create new project");
  }
};
