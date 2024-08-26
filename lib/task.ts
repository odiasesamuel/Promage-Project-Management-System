import { pool } from "./db";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";

export const storeNewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, assigned_by: string) => {
  const { task_description, assigned_to, checked, status } = values;
  const query = `
    INSERT INTO task_list (organisation_id, assigned_by, assigned_to, description, checked, status)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(query, [organisation_id, assigned_by, assigned_to, task_description, checked, status]);
};

export const reviewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, task_id: number) => {
  const { task_description, assigned_to, checked, status } = values;
  const query = `
    UPDATE task_list
    SET description = $1, assigned_to = $2, checked = $3, status = $4
    WHERE organisation_id = $5 AND task_id = $6
  `;
  await pool.query(query, [task_description, assigned_to, checked, status, organisation_id, task_id]);
};

export const deleteTask = async (organisation_id: string, task_id: number | undefined) => {
  const query = `
    DELETE FROM task_list
    WHERE organisation_id = $1 AND task_id = $2
  `;
  await pool.query(query, [organisation_id, task_id]);
};

export const checkCompletedTask = async (organisation_id: string, employee_id: string, task_id: number, checked: string) => {
  const query = `
    UPDATE task_list
    SET checked = $1
    WHERE organisation_id = $2 AND assigned_to = $3 AND task_id = $4
  `;
  await pool.query(query, [checked, organisation_id, employee_id, task_id]);
};

export const getNoteContent = async (organisation_id: string, employee_id: string) => {
  const query = `
    SELECT * FROM task_note
    WHERE organisation_id = $1 AND employee_id = $2
  `;
  const result = await pool.query(query, [organisation_id, employee_id]);
  return result.rows[0];
};

export const saveNote = async (organisation_id: string, employee_id: string, note: string) => {
  const query = `
    UPDATE task_note
    SET note = $1
    WHERE organisation_id = $2 AND employee_id = $3
  `;
  await pool.query(query, [note, organisation_id, employee_id]);
};

export const clearNote = async (organisation_id: string, employee_id: string) => {
  const query = `
    UPDATE task_note
    SET note = ''
    WHERE organisation_id = $1 AND employee_id = $2
  `;
  await pool.query(query, [organisation_id, employee_id]);
};
