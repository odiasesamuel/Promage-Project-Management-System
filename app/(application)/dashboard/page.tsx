import Metrics from "@/components/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "../../../components/columns";
import { DataTable } from "../../../components/data-table";
import OverallProgress from "@/components/overallProgress";
import ProjectWorkload from "@/components/projectWorkload";
import projectList from "@/data/projectList.json";
import TaskList from "@/components/taskList";
import { getProjectSummary, getProgress, getTaskList } from "@/lib/dashboard";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId } from "@/lib/employee";
import { EmployeeDetailsType } from "@/actions/auth-action";

const Home = async () => {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeDetailsType = getEmployeeByEmployeeId(result.user.id);
  // const data = projectList;
  const employee_id = employeeDetails.id;
  const organisation_id = employeeDetails.organization_id;
  const projectList_db = getProjectSummary();
  const progress = getProgress();
  const taskList = getTaskList();
  // console.log(employeeDetails);

  return (
    <div className="text-black">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-5">Overview</h3>
      <Metrics organisation_id={organisation_id} />
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5]">
          <CardContent>
            <DataTable columns={columns} data={projectList_db} className="" />
          </CardContent>
        </Card>
        <Card className="w-[34%] h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <OverallProgress progress={progress} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between my-6">
        <Card className="w-[64%] bg-[#F2EAE5] self-start min-h-[300px]">
          <CardHeader className="pt-6 pb-4">
            <CardTitle>Today Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="important" className="w-full">
              <TabsList>
                <TabsTrigger value="all">
                  <span>All</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">10</span>
                </TabsTrigger>
                <TabsTrigger value="important">
                  <span>Important</span>
                  {/* <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">05</span> */}
                </TabsTrigger>
                <TabsTrigger value="note">
                  <span>Notes</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">02</span>
                </TabsTrigger>
                <TabsTrigger value="link">
                  <span>Links</span>
                  <span className="ml-2 rounded-full bg-[#DEDCE5] w-5 h-5 flex justify-center items-center text-[0.7rem] text-[#2B5CE6]">17</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">All tab</TabsContent>
              <TabsContent value="important" className="mt-3">
                <TaskList data={taskList} />
              </TabsContent>
              <TabsContent value="note">Note tab</TabsContent>
              <TabsContent value="link">link tab</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="w-[34%] min-h-[330px] bg-[#F2EAE5]">
          <CardHeader className="py-8">
            <CardTitle>Project Workload</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <ProjectWorkload />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
