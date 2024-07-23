"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getEmployeeByEmail, getOrganisationByEmail, createOrganisationAccount, createAdminEmployeeAccount, createEmployeeAccount } from "@/lib/employee";
import { createAuthSession, destroySession } from "@/lib/auth";
import { addMetricsOnSignUp, addProgressDataOnSignUp, addProjectWorkloadDataOnSignUp } from "@/lib/dashboard";
import { welcomeEmployeeEmailTemplate, welcomeAdminEmailTemplate } from "@/lib/email/templates";
import { sendEmail, EmailOptions } from "@/lib/email/email";

export type ValueType = {
  email: string;
  employee_id: string;
};

export type EmployeeSignInDetailsType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
  job_title: string;
};

export type OrganisationSignUpDetailsType = {
  organisation_name: string;
  organisation_email: string;
  administrator_name: string;
  administrator_email: string;
};

export type AdminDetailsType = {
  administrator_name: string;
  administrator_email: string;
  administrator_employee_id: string;
};

export type EmployeeSignUpDetailsType = {
  employee_name: string;
  employee_email: string;
  job_title: string;
};

export type MetricSignUpDetailsType = {
  last_quarter_revenue: number;
  last_quarter_project: number;
  last_quarter_time: number;
  last_quarter_resources: number;
};

// Function to simulate network delay
const simulateNetworkDelay = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const login = async (values: ValueType) => {
  try {
    // Simulate network delay of 2 seconds
    await simulateNetworkDelay(2000);

    const existingUser: EmployeeSignInDetailsType = getEmployeeByEmail(values.email);
    if (!existingUser) throw new Error("Could not authenticate employee, please check your credentials.");

    if (existingUser.id !== values.employee_id) throw new Error("Could not authenticate employee, please check your credentials.");

    await createAuthSession(existingUser.id);

    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signup = async (organisation_info: OrganisationSignUpDetailsType, employee_info: EmployeeSignUpDetailsType[], metric_info: MetricSignUpDetailsType) => {
  try {
    // Simulate network delay of 2 seconds
    await simulateNetworkDelay(2000);
    // console.log(organisation_info, employee_info, metric_info);

    const existingOrganisation: OrganisationSignUpDetailsType = getOrganisationByEmail(organisation_info.organisation_email);
    // if (existingOrganisation) throw new Error("This organisation has already been registered");
    console.log("working..");
    const organisation_id = await createOrganisationAccount(organisation_info);
    // console.log(organisation_id);
    const adminDetails = await createAdminEmployeeAccount(organisation_id, organisation_info);

    const employeeDetails = await createEmployeeAccount(organisation_id, employee_info);

    await addMetricsOnSignUp(organisation_id, metric_info, employeeDetails);
    await addProgressDataOnSignUp(organisation_id);
    await addProjectWorkloadDataOnSignUp(organisation_id, adminDetails, employeeDetails);

    const administrator_login_details = {
      email: adminDetails.administrator_email,
      employee_id: adminDetails.administrator_employee_id,
    };

    // Send welcome email to the admin
    const adminSubject = "Welcome to Promage! Your Admin Account is Ready";
    const adminHtml = welcomeAdminEmailTemplate(organisation_id, organisation_info, adminDetails);
    const adminEmailOptions: EmailOptions = {
      to: adminDetails.administrator_email,
      subject: adminSubject,
      html: adminHtml,
    };
    console.log(adminDetails.administrator_email);
    await sendEmail(adminEmailOptions);

    // Send welcome email to the empployees
    const employeeHtml = welcomeEmployeeEmailTemplate(organisation_id, employeeDetails);

    return login(administrator_login_details);
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signout = async () => {
  await destroySession();
  return { success: true };
};
