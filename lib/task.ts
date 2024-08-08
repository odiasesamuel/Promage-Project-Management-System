import db from "./db";
import { z } from "zod";
import { reviewTaskFormSchema } from "@/lib/formSchema";

export const reviewTask = async (organisation_id: string, values: z.infer<typeof reviewTaskFormSchema>, task_id: number) => {
  //   console.log(organisation_id, values, task_id);
  const { task_description, assigned_to, checked, status } = values;
  const stmtUpdate = db.prepare(`
    UPDATE task_list
    SET description = ?, assigned_to = ?, checked = ?, status = ?
    WHERE organisation_id = ? AND task_id = ?
    `);

  stmtUpdate.run(task_description, assigned_to, checked, status, organisation_id, task_id);
};

export const deleteTask = async (organisation_id: string, task_id: number) => {
  const stmtDelete = db.prepare(`DELETE FROM task_list WHERE organisation_id = ? AND task_id = ?`);

  stmtDelete.run(organisation_id, task_id);
};
