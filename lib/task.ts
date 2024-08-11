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
  console.log(organisation_id, employee_id, task_id, checked);

  const stmtUpdate = db.prepare(`
    UPDATE task_list
    SET checked = ?
    WHERE organisation_id = ? AND assigned_to = ? AND task_id = ?
    `);

  stmtUpdate.run(checked, organisation_id, employee_id, task_id);
};
