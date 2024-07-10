"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { geEmployeeByEmail } from "@/lib/user";

export type ValueType = {
  email: string;
  employee_id: string;
};

// Function to simulate network delay
const simulateNetworkDelay = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const login = async (values: ValueType) => {
  try {
    // Simulate network delay of 2 seconds
    await simulateNetworkDelay(2000);

    const existingUser = geEmployeeByEmail(values.email);
    console.log(existingUser);
    if (!existingUser) {
      throw new Error("Could not authenticate employee, please check your credentials.");
    }

    
    return { success: true };
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};
