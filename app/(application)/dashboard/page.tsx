import Metrics from "@/components/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns, ProjectListType } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import OverallProgress from "@/components/overallProgress";
import ProjectWorkload from "@/components/projectWorkload";
import TabContent from "@/components/tabContent";
import { getProjectSummary, getProgress, getTaskListAssignedToMe, getMetrics, getProjectWorkLoad } from "@/lib/dashboard";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { MetricsType } from "@/components/metrics";
import { ProgressDataType } from "@/components/overallProgress";
import { TaskListType } from "@/components/taskList";
import { ProjectWorkloadDataType } from "@/components/projectWorkload";

const Home = async () => {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeSignInDetailsType = await getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employee_id = employeeDetails.id;

  const metrics: MetricsType[] = await getMetrics(organisation_id);
  const projectList: ProjectListType[] = await getProjectSummary(organisation_id);
  const progress: ProgressDataType[] = await getProgress(organisation_id);
  const taskList: TaskListType[] = await getTaskListAssignedToMe(organisation_id, employee_id);
  const projectWorkload: ProjectWorkloadDataType[] = await getProjectWorkLoad(organisation_id);

  return (
    <div className="text-black">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">Overview</h3>
      <Metrics />
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5]">
          <CardContent>
            <DataTable columns={columns} dataTableHeading={"Project summary"} />
          </CardContent>
        </Card>
        <Card className="w-[34%] h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <OverallProgress />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5] self-start min-h-[300px]">
          <CardHeader className="pt-6 pb-4">
            <CardTitle>Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TabContent />
          </CardContent>
        </Card>
        <Card className="w-[34%] min-h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Project Workload</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <ProjectWorkload projectWorkloadData={projectWorkload} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
