"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";

import { storeNewProject } from "@/lib/project";

export type newProjectFormValueType = {
  organisation_id: string;
  dueDate: string;
  projectName: string;
  projectManager: string;
  revenue: number;
  status: "Completed" | "On going" | "Delayed" | "At risk";
  progress: number;
};

export const createNewProject = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined) => {
  try {
    await storeNewProject(values, projectTeam, projectManagerId);
    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error("Failed to create new project");
  }
};
