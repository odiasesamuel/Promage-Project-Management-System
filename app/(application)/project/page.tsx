import { columns, ProjectListType } from "../../../components/columns";
import { getProjectSummary } from "@/lib/dashboard";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId, getAllEmployee } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { DataTable } from "../../../components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeListType } from "../layout";

const ProjectPage = async () => {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeSignInDetailsType = await getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employeeList: EmployeeListType[] = await getAllEmployee(organisation_id);

  const projectList: ProjectListType[] = await getProjectSummary(organisation_id);

  return (
    <>
      <Card className="bg-[#F2EAE5] mt-12">
        <CardContent>
          <DataTable columns={columns} data={projectList} employeeList={employeeList} className="" />
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectPage;
