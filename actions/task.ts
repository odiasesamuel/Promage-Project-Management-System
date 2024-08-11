"use server";

import { revalidatePath } from "next/cache";
import { reviewTask, deleteTask, storeNewTask, checkCompletedTask, getNoteContent, saveNote, clearNote } from "@/lib/task";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";

export const createNewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, assigned_by: string) => {
  try {
    await storeNewTask(organisation_id, values, assigned_by);
    revalidatePath("/tasks");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to create task" };
  }
};

export const reviewTaskAction = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, task_id: number) => {
  try {
    await reviewTask(organisation_id, values, task_id);

    revalidatePath("/tasks");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to review task" };
  }
};

export const deleteTaskAction = async (organisation_id: string, task_id: number | undefined) => {
  try {
    await deleteTask(organisation_id, task_id);

    revalidatePath("/tasks");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to delete task" };
  }
};

export const checkCompletedTaskAction = async (organisation_id: string, employee_id: string, task_id: number, checked: string) => {
  try {
    await checkCompletedTask(organisation_id, employee_id, task_id, checked);

    revalidatePath("/dashboard");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to check task" };
  }
};

export const getNoteContentAction = async (organisation_id: string, employee_id: string) => {
  const note = await getNoteContent(organisation_id, employee_id);
  return note;
};

export const saveNoteAction = async (organisation_id: string, employee_id: string, note: string) => {
  try {
    await saveNote(organisation_id, employee_id, note);

    revalidatePath("/dashboard");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to save note" };
  }
};

export const clearNoteAction = async (organisation_id: string, employee_id: string) => {
  try {
    await clearNote(organisation_id, employee_id);

    revalidatePath("/dashboard");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to clear note" };
  }
};
