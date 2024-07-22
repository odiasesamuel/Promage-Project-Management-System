"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getEmployeeByEmail, getOrganisationByEmail, createOrganisationAccount, createAdminEmployeeAccount, createEmployeeAccount } from "@/lib/employee";
import { createAuthSession, destroySession } from "@/lib/auth";
import { addMetricsOnSignUp, addProgressDataOnSignUp } from "@/lib/dashboard";

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
    if (existingOrganisation) throw new Error("This organisation has already been registered");
    const organisation_id = await createOrganisationAccount(organisation_info);
    // console.log(organisation_id);
    const adminDetails = await createAdminEmployeeAccount(organisation_id, organisation_info);

    const employeeDetails = await createEmployeeAccount(organisation_id, employee_info);
    console.log(employeeDetails);

    await addMetricsOnSignUp(organisation_id, metric_info, employeeDetails);
    await addProgressDataOnSignUp(organisation_id);

    const administrator_login_details = {
      email: adminDetails.administrator_email,
      employee_id: adminDetails.administrator_employee_id,
    };

    return login(administrator_login_details);
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signout = async () => {
  await destroySession();
  return { success: true };
};
