import { z } from "zod";

const authFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const createNewProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  projectManager: z.string().min(1, { message: "Project manager is required" }),
  revenue: z.number().positive({ message: "Revenue must be a positive number" }),
  status: z.enum(["Completed", "On going", "Delayed", "At risk"], { message: "Invalid status" }),
  progress: z.number().positive({ message: "Progress must be from 1-100" }),
  dueDate: z.date({
    required_error: "A Due date for the project is required.",
  }),
  // description: z.string().min(1, { message: "Description is required" }),
  // startDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  // endDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  // teamMembers: z.array(z.string().min(1)).nonempty({ message: "At least one team member is required" }),
});

export { authFormSchema, createNewProjectSchema };
