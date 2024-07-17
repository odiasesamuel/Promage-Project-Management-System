import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  employee_id: z.string().length(6, { message: "Employee ID must be 6 characters long" }),
});

const signUpFormSchema = z.object({
  organisation_name: z.string().min(1, { message: "Organisation name is required" }),
  organisation_email: z.string().email({ message: "Invalid email address" }),
  administrator_name: z.string().min(1, { message: "Administrator name is required" }),
  administrator_email: z.string().email({ message: "Invalid email address" }),
  employee_name: z.string().min(1, { message: "Employee name is required" }),
  employee_email: z.string().email({ message: "Invalid email address" }),
  job_title: z.string().min(1, { message: "Job title is required" }),
  last_month_revenue: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Revenue must be a positive number",
    }),
  last_month_project: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Project must be a positive number",
    }),
  last_month_time: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Project must be a positive number",
    }),
  last_month_resources: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Project must be a positive number",
    }),
});

const createNewProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  projectManager: z.string().min(1, { message: "Project manager is required" }),
  revenue: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Revenue must be a positive number",
    }),
  status: z.enum(["Completed", "On going", "Delayed", "At risk"], { message: "Invalid status" }),
  progress: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
      message: "Progress must be from 1 to 100",
    }),
  dueDate: z.date({
    required_error: "A Due date for the project is required.",
  }),
});

export { signInFormSchema, signUpFormSchema, createNewProjectSchema };
