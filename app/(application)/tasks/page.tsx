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
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeSignInDetailsType = await getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employee_id = employeeDetails.id;
  const employeeList: EmployeeListType[] = await getAllEmployee(organisation_id);

  const taskList: TaskListType[] = await getTaskListAssignedByMe(organisation_id, employee_id);
  const updateTaskListWithEmployeeName = await Promise.all(
    taskList.map(async (task) => {
      const assignedToEmployee = await getEmployeeByEmployeeId(task.assigned_to);

      return {
        ...task,
        assigned_to_name: assignedToEmployee.employee_name,
      };
    })
  );

  return (
    <>
      <Card className="bg-[#F2EAE5] mt-12 overflow-x-auto">
        <CardContent>
          <DataTable columns={columns} data={updateTaskListWithEmployeeName} employeeListData={employeeList} assigned_by={employee_id} className="sm:w-[800px] sm:pr-3" />
        </CardContent>
      </Card>
    </>
  );
};

export default TaskPage;
