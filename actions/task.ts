"use server";

import { revalidatePath } from "next/cache";
import { reviewTask, deleteTask } from "@/lib/task";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";

export const reviewTaskAction = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, task_id: number) => {
  try {
    await reviewTask(organisation_id, values, task_id);

    revalidatePath("/tasks");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to review task" };
  }
};

export const deleteTaskAction = async (organisation_id: string, task_id: number) => {
  try {
    await deleteTask(organisation_id, task_id);

    revalidatePath("/tasks");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to review task" };
  }
};
