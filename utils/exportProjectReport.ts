import * as XLSX from "xlsx";

import { ProjectListType } from "@/components/columns";
import { formatDateInProjectSummary } from "./dateUtils";

export const exportProjectReport = (data: ProjectListType[]) => {
  const transformedData = data.map((project) => ({
    "Project Name": project.project_name,
    "Project Manager": project.project_manager,
    "Revenue in dollars": project.revenue,
    "Due Date": formatDateInProjectSummary(project.due_date),
    Status: project.status,
    Progress: `${project.progress}%`,
    "Project Team": project.project_team.map((member: any) => member.label).join(", "),
  }));
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelDataUri = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });
  const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataUri}`;
  const a = document.createElement("a");
  a.href = dataUri;
  a.download = "Project Report";
  a.click();
};
