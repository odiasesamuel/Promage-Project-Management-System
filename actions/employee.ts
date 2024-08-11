"use server";

import { revalidatePath } from "next/cache";
import { EmployeeSignUpDetailsType } from "@/actions/auth-action";
import { createSingleEmployeeAccount, getAllEmployee, getOrganisationByOrganisationId, deleteEmployeeAccount, getEmployeeByEmployeeId, clearOrganisationData } from "@/lib/employee";
import { updateMetricsAfterAddingSingleEmployee, addProjectWorkloadDataAfterAddingSingleEmployee } from "@/lib/dashboard";
import { welcomeEmployeeEmailTemplate, removalFromOrganisationWorkspace } from "@/lib/email/templates";
import { sendEmail, EmailOptions } from "@/lib/email/email";

export type EmployeeListType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
  job_title: string;
};

export type removeExistingEmployeeFormType = {
  employee_id: string;
  removal_reason: string;
  notify: "Yes" | "No";
};

export const removeExistingEmployee = async (organisation_id: string, removedEmployeeInfo: removeExistingEmployeeFormType) => {
  try {
    const organisationDetails = await getOrganisationByOrganisationId(organisation_id);
    const organisation_name = organisationDetails.organisation_name;

    const employeeDetails = await getEmployeeByEmployeeId(removedEmployeeInfo.employee_id);

    deleteEmployeeAccount(organisation_id, removedEmployeeInfo);

    if (removedEmployeeInfo.notify === "Yes") {
      // Send email notification to employee of removal
      const employeeSubject = `Notification of Removal from ${organisation_name} Workspace`;
      const employeeHtml = removalFromOrganisationWorkspace(organisationDetails.organisation_name, employeeDetails);
      const employeeEmailOptions: EmailOptions = {
        to: employeeDetails.employee_email,
        subject: employeeSubject,
        html: employeeHtml,
      };
      await sendEmail(employeeEmailOptions);
    }

    revalidatePath("/");
    return { success: true, message: null };
  } catch (error) {
    return { success: false, message: "Failed to remove employee" };
  }
};

export const addNewEmployee = async (organisation_id: string, employee_info: EmployeeSignUpDetailsType) => {
  try {
    const employeeList: EmployeeListType[] = await getAllEmployee(organisation_id);

    const isEmployeeAlreadyPartOfOrganisation = employeeList.some((employee) => employee.employee_email === employee_info.employee_email);
    if (isEmployeeAlreadyPartOfOrganisation) {
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

export const clearOrganisationDataAction = (organisation_id: string) => {
  clearOrganisationData(organisation_id);
  revalidatePath("/dashboard");
};
