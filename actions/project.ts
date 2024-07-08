"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { storeNewProject } from "@/lib/project";

export type ValueType = {
  dueDate: string;
  projectName: string;
  projectManager: string;
  revenue: number;
  status: "Completed" | "On going" | "Delayed" | "At risk";
  progress: number;
};

export const createNewProject = async (values: ValueType) => {
  try {
    await storeNewProject(values);
    revalidatePath("/dashboard");
    // redirect("/dashboard");
  } catch (error) {
    throw new Error("Failed to create new project");
  }
};
