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
    <div className="text-black  max-w-[1535px] mx-auto">
      <h3 className="scroll-m-20 text-xl font-medium tracking-tight my-5">Overview</h3>
      <Metrics metricsData={metrics} />
      <div className="flex flex-wrap gap-4 my-6">
        <Card className="w-[64%] overflow-x-auto xl:w-[100%] bg-[#F2EAE5]">
          <CardContent>
            <DataTable columns={columns} data={projectList} dataTableHeading={"Project summary"} className="sm:w-[800px] sm:pr-3" />
          </CardContent>
        </Card>
        <Card className="w-[34%] h-[330px] xl:w-[48%] xl:h-[380px] lg:w-[58%] lg:h-[450px] md:w-[100%] sm:h-[400px] xs:h-[350px] 2xs:h-[300px]  3xl:h-[430px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <OverallProgress progressData={progress} />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap gap-4 my-6">
        <Card className="w-[64%] xl:w-[100%] bg-[#F2EAE5] self-start min-h-[300px]">
          <CardHeader className="pt-6 pb-4">
            <CardTitle>Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TabContent taskList={taskList} organisation_id={organisation_id} employee_id={employee_id} />
          </CardContent>
        </Card>
        <Card className="w-[34%] xl:w-[100%] min-h-[330px] bg-[#F2EAE5]">
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
