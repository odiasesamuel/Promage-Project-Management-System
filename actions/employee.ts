"use server";

import { revalidatePath } from "next/cache";
import { EmployeeSignUpDetailsType } from "@/actions/auth-action";
import { createSingleEmployeeAccount, getAllEmployee, getOrganisationByOrganisationId } from "@/lib/employee";
import { updateMetricsAfterAddingSingleEmployee, addProjectWorkloadDataAfterAddingSingleEmployee } from "@/lib/dashboard";
import { welcomeEmployeeEmailTemplate } from "@/lib/email/templates";
import { sendEmail, EmailOptions } from "@/lib/email/email";

export type EmployeeListType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
  job_title: string;
};

export const addNewEmployee = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType) => {
  try {
    const employeeList: EmployeeListType[] = await getAllEmployee(organisation_id);

    const isEmployeeAlreadyPartOfOrganisation = employeeList.some((employee) => employee.employee_email === employee_info.employee_email);
    console.log(isEmployeeAlreadyPartOfOrganisation);
    if (isEmployeeAlreadyPartOfOrganisation) {
      console.log("Employee already part of your organisation");
      return { success: false, message: "Employee already part of your organisation" };
    }

    const employeeDetails = await createSingleEmployeeAccount(organisation_id, employee_info);
    await updateMetricsAfterAddingSingleEmployee(organisation_id, employeeDetails);
    await addProjectWorkloadDataAfterAddingSingleEmployee(organisation_id, employeeDetails);

    const organisationDetails = await getOrganisationByOrganisationId(organisation_id);

    // Send welcome email to the employees
    const employeeSubject = "Welcome to Promage! Your Account Has Been Created";
    const employeeHtml = welcomeEmployeeEmailTemplate(organisationDetails.organisation_name, employeeDetails);
    const employeeEmailOptions: EmailOptions = {
      to: employeeDetails.employee_email,
      subject: employeeSubject,
      html: employeeHtml,
    };
    await sendEmail(employeeEmailOptions);

    revalidatePath("/");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to add employee" };
  }
};

export const getEmployeeList = async (organisation_id: string) => {
  const employeeList: EmployeeListType[] = getAllEmployee(organisation_id);

  return employeeList;
};
