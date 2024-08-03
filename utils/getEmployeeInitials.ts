export const getEmployeeInitials = (fullName: string) => {
  const names = fullName.split(" ");
  const firstNameInitial = names[0] ? names[0][0] : "";
  const lastNameInitial = names.length > 1 ? names[names.length - 1][0] : "";

  return `${firstNameInitial}${lastNameInitial}`;
};

const employeeList = [
  {
    id: "ALI123",
    organisation_id: "BOL123",
    employee_name: "Alice Johnson",
    employee_email: "alice.johnson@gmail.com",
    job_title: "Software Engineer",
  },
  {
    id: "BOB456",
    organisation_id: "BOL123",
    employee_name: "Bob Smith",
    employee_email: "bob.smith@gmail.com",
    job_title: "Product Manager",
  },
  {
    id: "CHA789",
    organisation_id: "BOL123",
    employee_name: "Charlie Brown",
    employee_email: "charlie.brown@gmail.com",
    job_title: "Software Engineer",
  },
  {
    id: "DAV101",
    organisation_id: "BOL123",
    employee_name: "David Wilson",
    employee_email: "david.wilson@gmail.com",
    job_title: "Data Analyst",
  },
  {
    id: "EVA202",
    organisation_id: "BOL123",
    employee_name: "Evelyn White",
    employee_email: "evelyn.white@gmail.com",
    job_title: "UX Designer",
  },
  {
    id: "FRA303",
    organisation_id: "BOL123",
    employee_name: "Frank Thomas",
    employee_email: "frank.thomas@gmail.com",
    job_title: "Project Manager",
  },
  {
    id: "GRH404",
    organisation_id: "BOL123",
    employee_name: "Grace Harris",
    employee_email: "grace.harris@gmail.com",
    job_title: "HR Manager",
  },
  {
    id: "HAN505",
    organisation_id: "BOL123",
    employee_name: "Hannah Martin",
    employee_email: "hannah.martin@gmail.com",
    job_title: "Marketing Specialist",
  },
  {
    id: "ISA606",
    organisation_id: "BOL123",
    employee_name: "Isaac Garcia",
    employee_email: "isaac.garcia@gmail.com",
    job_title: "System Administrator",
  },
  {
    id: "JUL707",
    organisation_id: "BOL123",
    employee_name: "Julia Martinez",
    employee_email: "julia.martinez@gmail.com",
    job_title: "Content Writer",
  },
  {
    id: "KAR808",
    organisation_id: "BOL123",
    employee_name: "Karen Rodriguez",
    employee_email: "karen.rodriguez@gmail.com",
    job_title: "QA Engineer",
  },
  {
    id: "LUK909",
    organisation_id: "BOL123",
    employee_name: "Luke Hernandez",
    employee_email: "luke.hernandez@gmail.com",
    job_title: "DevOps Engineer",
  },
  {
    id: "MAR010",
    organisation_id: "BOL123",
    employee_name: "Maria Clark",
    employee_email: "maria.clark@gmail.com",
    job_title: "Business Analyst",
  },
  {
    id: "NAT111",
    organisation_id: "BOL123",
    employee_name: "Nathan Lewis",
    employee_email: "nathan.lewis@gmail.com",
    job_title: "Frontend Developer",
  },
  {
    id: "OLI212",
    organisation_id: "BOL123",
    employee_name: "Olivia Walker",
    employee_email: "olivia.walker@gmail.com",
    job_title: "Backend Developer",
  },
  {
    id: "PAT313",
    organisation_id: "BOL123",
    employee_name: "Patrick Young",
    employee_email: "patrick.young@gmail.com",
    job_title: "Network Engineer",
  },
  {
    id: "QUI414",
    organisation_id: "BOL123",
    employee_name: "Quinn King",
    employee_email: "quinn.king@gmail.com",
    job_title: "Graphic Designer",
  },
  {
    id: "RAC515",
    organisation_id: "BOL123",
    employee_name: "Rachel Scott",
    employee_email: "rachel.scott@gmail.com",
    job_title: "Customer Support",
  },
  {
    id: "SAM616",
    organisation_id: "BOL123",
    employee_name: "Samuel Green",
    employee_email: "samuel.green@gmail.com",
    job_title: "Sales Manager",
  },
  {
    id: "TOM717",
    organisation_id: "BOL123",
    employee_name: "Thomas Baker",
    employee_email: "thomas.baker@gmail.com",
    job_title: "Accountant",
  },
];
