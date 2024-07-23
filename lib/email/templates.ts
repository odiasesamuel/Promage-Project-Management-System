import { EmployeeSignUpDetailsType, AdminDetailsType, OrganisationSignUpDetailsType } from "@/actions/auth-action";

export const welcomeOrganisationEmailTemplate = (
  organisation_id: string,
  organisation_info: OrganisationSignUpDetailsType,
  adminDetails: AdminDetailsType,
  employeeDetails: (EmployeeSignUpDetailsType & {
    employee_id: string;
  })[]
) => {
  const { administrator_name, administrator_employee_id, administrator_email } = adminDetails;
  const { organisation_name } = organisation_info;

  const employeeList = employeeDetails
    .map((employee) => {
      const { employee_name, employee_email } = employee;
      return `<li>${employee_name} - ${employee_email}</li>`;
    })
    .join("");

  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #E65F2B;">Welcome to Promage!</h2>
        <p>Hello <strong>${organisation_name}</strong> Team,</p>
        <p>We are excited to have you on board. Your organisation registration has been successfully completed. Below are the details of your registration:</p>
        <ul>
          <li><strong>Organization ID:</strong> ${organisation_id}</li>
          <li><strong>Registered Employees:</strong></li>
          <ul>
            <li>${administrator_name} - ${administrator_email}</li>
            ${employeeList}
          </ul>
        </ul>
        <p>Your organization can now begin collaborating on projects, managing tasks, and tracking progress effectively with Promage. We are here to support your team in achieving great results.</p>
        <p>Thank you for choosing Promage!</p>
  
        <p>Best regards,</p>
        <p>The Promage Team</p>
        <div style="display: flex; align-items: center;">
          <img 
            src="https://raw.githubusercontent.com/odiasesamuel/Promage-Project-Management-System/feature/auth-api/assets/logo.png" 
            alt="Logo of Promage" 
            style="width: 36px; height: 35px;"
          />
          <h1 style="margin-left: 4px; font-size: 24px; font-weight: 500; color: black;">Promage</h1>
        </div>
      </div>
    `;
};

export const welcomeAdminEmailTemplate = (organisation_id: string, organisation_info: OrganisationSignUpDetailsType, adminDetails: AdminDetailsType) => {
  const { administrator_name, administrator_employee_id, administrator_email } = adminDetails;
  const { organisation_name } = organisation_info;
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #E65F2B;">Welcome to Promage!</h2>
      <p>Hello <strong>${administrator_name}</strong>,</p>
      <p>Congratulations on successfully registering <strong>${organisation_name}</strong> with <strong  style="color: #E65F2B;">Promage.</strong> As the admin, you have full access to manage your team and projects effectively. Here are your login details:</p>
      <ul>
       <li><strong>Email:</strong> ${administrator_email}</li>
        <li><strong>Employee ID:</strong> ${administrator_employee_id}</li>
        <li><strong>Organization ID:</strong> ${organisation_id}</li>
      </ul>
      <p>Please keep this information secure. You can log in to your admin account using the link below:</p>
    	<p style="text-align: center; padding: 10px 0;">
        <a href="https://promage.com/login" style="background-color: #E65F2B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to Your Account</a>
      </p>
      <p>Once logged in, you can start adding projects, assigning tasks, and monitoring your organization's progress.</p>

      <p>Best regards,</p>
      <p>The Promage Team</p>
  	<div style="display: flex; align-items: center;">
  	<img 
        src="https://raw.githubusercontent.com/odiasesamuel/Promage-Project-Management-System/feature/auth-api/assets/logo.png" 
        alt="Logo of Promage" 
        style="width: 36px; height: 35px;"
    />
  	<h1 style="margin-left: 4px; font-size: 24px; font-weight: 500; color: black;">Promage</h1>
	</div>

    </div>
  `;
};

export const welcomeEmployeeEmailTemplate = (
  organisation_info: OrganisationSignUpDetailsType,
  employee: EmployeeSignUpDetailsType & {
    employee_id: string;
  }
) => {
  const { employee_name, employee_id, employee_email } = employee;
  const { organisation_name } = organisation_info;
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #E65F2B;">Welcome to Promage!</h2>
        <p>Hello <strong>${employee_name}</strong>,</p>
        <p>We are thrilled to inform you that your account has been set up on <strong  style="color: #E65F2B;">Promage</strong> by <strong>${organisation_name}.</strong> You can now start collaborating on projects and managing tasks. Here are your login details:</p>
        <ul>
         <li><strong>Email:</strong> ${employee_email}</li>
          <li><strong>Employee ID:</strong> ${employee_id}</li>
        </ul>
        <p>Please keep this information secure. You can log in to your employee account using the link below:</p>
          <p style="text-align: center; padding: 10px 0;">
          <a href="https://promage.com/login" style="background-color: #E65F2B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In to Your Account</a>
        </p>
        <p>Once logged in, you can start adding projects, assigning tasks, and monitoring your organization's progress.</p>
  
        <p>Best regards,</p>
        <p>The Promage Team</p>
        <div style="display: flex; align-items: center;">
        <img 
          src="https://raw.githubusercontent.com/odiasesamuel/Promage-Project-Management-System/feature/auth-api/assets/logo.png" 
          alt="Logo of Promage" 
          style="width: 36px; height: 35px;"
      />
        <h1 style="margin-left: 4px; font-size: 24px; font-weight: 500; color: black;">Promage</h1>
      </div>
  
      </div>
    `;
};
