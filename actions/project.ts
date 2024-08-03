"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EmployeeOptions } from "@/components/form/newProjectForm";
import { MultiValue } from "react-select";

import { storeNewProject, reviewProject, deleteProject } from "@/lib/project";

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

export const reviewProjectAction = async (values: newProjectFormValueType, projectTeam: MultiValue<EmployeeOptions> | undefined, projectManagerId: string | undefined, project_id: number) => {
  try {
    await reviewProject(values, projectTeam, projectManagerId, project_id);
    revalidatePath("/project");
  } catch (error) {
    throw new Error("Failed to review project");
  }
};

export const deleteProjectAction = async (organisation_id: string, project_id: number | undefined) => {
  try {
    await deleteProject(organisation_id, project_id);
    revalidatePath("/project");

    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to delete project" };
  }
};
