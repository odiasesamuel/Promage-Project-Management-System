"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getEmployeeByEmail } from "@/lib/employee";
import { createAuthSession, destroySession } from "@/lib/auth";

export type ValueType = {
  email: string;
  employee_id: string;
};

export type EmployeeDetailsType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
};

// Function to simulate network delay
const simulateNetworkDelay = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const login = async (values: ValueType) => {
  try {
    // Simulate network delay of 2 seconds
    await simulateNetworkDelay(2000);

    const existingUser: EmployeeDetailsType = getEmployeeByEmail(values.email);
    if (!existingUser) throw new Error("Could not authenticate employee, please check your credentials.");

    if (existingUser.id !== values.employee_id) throw new Error("Could not authenticate employee, please check your credentials.");

    await createAuthSession(existingUser.id);

    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signout = async () => {
  await destroySession();
  return { success: true };
};
