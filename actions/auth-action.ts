"use server";

import { getEmployeeByEmail, getOrganisationByEmail, createOrganisationAccount, createAdminEmployeeAccount, createEmployeeAccount } from "@/lib/employee";
import { createAuthSession, destroySession, verifyAuth } from "@/lib/auth";
import { addMetricsOnSignUp, addProgressDataOnSignUp, addProjectWorkloadDataOnSignUp, addNoteDataOnSignUp } from "@/lib/dashboard";
import { welcomeEmployeeEmailTemplate, welcomeAdminEmailTemplate, welcomeOrganisationEmailTemplate } from "@/lib/email/templates";
import { sendEmail, EmailOptions } from "@/lib/email/email";
import { redirect } from "next/navigation";

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

export const login = async (values: ValueType) => {
  try {
    const existingUsers: EmployeeSignInDetailsType[] = await getEmployeeByEmail(values.email);
    if (existingUsers.length === 0) throw new Error("Could not authenticate employee, please check your credentials.");

    const matchingUser = existingUsers.find((user) => user.id === values.employee_id);

    if (!matchingUser) throw new Error("Could not authenticate employee, please check your credentials.");

    await createAuthSession(values.employee_id);

    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signup = async (organisation_info: OrganisationSignUpDetailsType, employee_info: EmployeeSignUpDetailsType[], metric_info: MetricSignUpDetailsType) => {
  try {
    const existingOrganisation: OrganisationSignUpDetailsType = await getOrganisationByEmail(organisation_info.organisation_email);
    if (existingOrganisation) throw new Error("This organisation has already been registered");
    const organisation_id = await createOrganisationAccount(organisation_info);
    const adminDetails = await createAdminEmployeeAccount(organisation_id, organisation_info);

    const employeeDetails = await createEmployeeAccount(organisation_id, employee_info);

    await addMetricsOnSignUp(organisation_id, metric_info, employeeDetails);
    await addProgressDataOnSignUp(organisation_id);
    await addProjectWorkloadDataOnSignUp(organisation_id, adminDetails, employeeDetails);
    await addNoteDataOnSignUp(organisation_id, adminDetails, employeeDetails);

    const administrator_login_details = {
      email: adminDetails.administrator_email,
      employee_id: adminDetails.administrator_employee_id,
    };

    const organisation_name = organisation_info.organisation_name;
    // Send welcome email to organisation
    const organisationSubject = "Welcome to Promage! Your Organization is Successfully Registered";
    const organisationHtml = welcomeOrganisationEmailTemplate(organisation_id, organisation_name, adminDetails, employeeDetails);
    const organisationEmailOptions: EmailOptions = {
      to: organisation_info.organisation_email,
      subject: organisationSubject,
      html: organisationHtml,
    };
    await sendEmail(organisationEmailOptions);

    // Send welcome email to the admin
    const adminSubject = "Welcome to Promage! Your Admin Account is Ready";
    const adminHtml = welcomeAdminEmailTemplate(organisation_id, organisation_name, adminDetails);
    const adminEmailOptions: EmailOptions = {
      to: adminDetails.administrator_email,
      subject: adminSubject,
      html: adminHtml,
    };
    await sendEmail(adminEmailOptions);

    // Send welcome email to the employees
    const employeeSubject = "Welcome to Promage! Your Account Has Been Created";
    employeeDetails.forEach(async (employee) => {
      const employeeHtml = welcomeEmployeeEmailTemplate(organisation_name, employee);
      const employeeEmailOptions: EmailOptions = {
        to: employee.employee_email,
        subject: employeeSubject,
        html: employeeHtml,
      };
      await sendEmail(employeeEmailOptions);
    });

    return login(administrator_login_details);
  } catch (error) {
    return { success: false, message: (error as Error).message || "An unknown error occurred" };
  }
};

export const signout = async () => {
  await destroySession();
  return { success: true };
};

export const verifyAuthAction = async () => {
  const result = await verifyAuth();
  // if (!result.user) {
  //   return redirect("/");
  // }

  return result;
};
