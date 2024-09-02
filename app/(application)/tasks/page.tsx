import { columns } from "../../../components/task-columns";
import { getProjectSummary, getTaskListAssignedByMe } from "@/lib/dashboard";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId, getAllEmployee } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { DataTable } from "../../../components/task-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeListType } from "../layout";
import { TaskListType } from "@/components/taskList";

const TaskPage = async () => {
  return (
    <>
      <Card className="bg-[#F2EAE5] mt-12">
        <CardContent>
          <DataTable columns={columns} />
        </CardContent>
      </Card>
    </>
  );
};

export default TaskPage;
