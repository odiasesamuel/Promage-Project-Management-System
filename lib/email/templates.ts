import { EmployeeSignUpDetailsType, AdminDetailsType } from "@/actions/auth-action";

export const welcomeAdminEmailTemplate = (organisation_id: string, adminDetails: AdminDetailsType) => {
  const { administrator_name, administrator_employee_id, administrator_email } = adminDetails;
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #E65F2B;">Welcome to Promage!</h2>
      <p>Hello <strong>${administrator_name}</strong>,</p>
      <p>Congratulations on successfully registering your organization with <strong  style="color: #E65F2B;">Promage.</strong> As the admin, you have full access to manage your team and projects effectively. Here are your login details:</p>
      <ul>
        <li><strong>Employee ID:</strong> ${administrator_employee_id}</li>
        <li><strong>Organization ID:</strong> ${organisation_id}</li>
        <li><strong>Email:</strong> ${administrator_email}</li>
      </ul>
      <p>Please keep this information secure. You can log in to your admin account using the link below:</p>
    	<p style="text-align: center; padding: 10px 0;">
        <a href="https://promage.com/login" style="background-color: #E65F2B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to Your Account</a>
      </p>
      <p>Once logged in, you can start adding projects, assigning tasks, and monitoring your organization's progress.</p>

      <p>Best regards,</p>
      <p>The Promage Team</p>
  	<div style="display: flex; align-items: center; margin-bottom: 12px;">
  	<img src="https://raw.githubusercontent.com/odiasesamuel/Promage-Project-Management-System/main/assets/logo.svg" alt="Logo of promage" style="display: inline-block;" />
  	<h1 style="margin-left: 4px; font-size: 24px; font-weight: 500; color: black;">Promage</h1>
	</div>

    </div>
  `;
};
export const welcomeEmployeeEmailTemplate = (
  organisation_id: string,
  employeeDetails: (EmployeeSignUpDetailsType & {
    employee_id: string;
  })[]
) => {
  employeeDetails.forEach((employee) => {
    const { employee_name, employee_id, employee_email } = employee;
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Welcome to Your Company!</h2>
          <p>Hi ${employee_name},</p>
          <p>We're excited to have you on board. Here are your login details:</p>
          <ul>
            <li><strong>Employee ID:</strong> ${employee_id}</li>
            <li><strong>Organisation ID:</strong> ${organisation_id}</li>
            <li><strong>Email:</strong> ${employee_email}</li>
          </ul>
          <p>Please use these details to log in to your account.</p>
          <p>Best regards,</p>
          <p>Your Company Team</p>
        </div>
      `;
  });
};
