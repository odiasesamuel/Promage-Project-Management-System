import db from "./db";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";

export const storeNewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, assigned_by: string) => {
  const { task_description, assigned_to, checked, status } = values;
  const stmtInsert = db.prepare(`
    INSERT INTO task_list (organisation_id, assigned_by, assigned_to, description, checked, status)
    VALUES (?, ?, ?, ?, ?, ?)
`);

  stmtInsert.run(organisation_id, assigned_by, assigned_to, task_description, checked, status);
};

export const reviewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, task_id: number) => {
  const { task_description, assigned_to, checked, status } = values;
  const stmtUpdate = db.prepare(`
    UPDATE task_list
    SET description = ?, assigned_to = ?, checked = ?, status = ?
    WHERE organisation_id = ? AND task_id = ?
    `);

  stmtUpdate.run(task_description, assigned_to, checked, status, organisation_id, task_id);
};

export const deleteTask = async (organisation_id: string, task_id: number | undefined) => {
  const stmtDelete = db.prepare(`DELETE FROM task_list WHERE organisation_id = ? AND task_id = ?`);

  stmtDelete.run(organisation_id, task_id);
};

export const checkCompletedTask = async (organisation_id: string, employee_id: string, task_id: number, checked: string) => {

  const stmtUpdate = db.prepare(`
    UPDATE task_list
    SET checked = ?
    WHERE organisation_id = ? AND assigned_to = ? AND task_id = ?
    `);

  stmtUpdate.run(checked, organisation_id, employee_id, task_id);
};

export const getNoteContent = (organisation_id: string, employee_id: string) => {
  return db.prepare(`SELECT * FROM task_note WHERE organisation_id = ? AND employee_id = ?`).get(organisation_id, employee_id);
};

export const saveNote = async (organisation_id: string, employee_id: string, note: string) => {
  const stmtUpdate = db.prepare(`
    UPDATE task_note
    SET note = ?
    WHERE organisation_id = ? AND employee_id = ?
  `);

  stmtUpdate.run(note, organisation_id, employee_id);
};

export const clearNote = async (organisation_id: string, employee_id: string) => {
  const stmtClearNote = db.prepare(`
    UPDATE task_note
    SET note = ?
    WHERE organisation_id = ? AND employee_id = ?
    `);
  stmtClearNote.run("", organisation_id, employee_id);
};
