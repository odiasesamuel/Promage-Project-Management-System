"use server";

import { revalidatePath } from "next/cache";
import { getProjectSummary, getProgress, getTaskListAssignedToMe, getMetrics, getProjectWorkLoad, getTaskListAssignedByMe } from "@/lib/dashboard";

export const getMetricsAction = async (organisation_id: string) => {
  const result = await getMetrics(organisation_id);
  return result;
};

export const getProjectAction = async (organisation_id: string) => {
  const result = await getProjectSummary(organisation_id);
  return result;
};

export const getProgressAction = async (organisation_id: string) => {
  const result = await getProgress(organisation_id);
  return result;
};

export const getTaskListAssignedToMeAction = async (organisation_id: string, employee_id: string) => {
  const result = await getTaskListAssignedToMe(organisation_id, employee_id);
  return result;
};

export const getTaskListAssignedByMeAction = async (organisation_id: string, employee_id: string) => {
  const result = await getTaskListAssignedByMe(organisation_id, employee_id);
  return result;
};

export const getProjectWorkloadAction = async (organisation_id: string) => {
  const result = await getProjectWorkLoad(organisation_id);
  return result;
};
