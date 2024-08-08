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
  const employeeDetails: EmployeeSignInDetailsType = getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employee_id = employeeDetails.id;
  const employeeList: EmployeeListType[] = getAllEmployee(organisation_id);

  const taskList: TaskListType[] = getTaskListAssignedByMe(organisation_id, employee_id);
  console.log(taskList);
  const updateTaskListWithEmployeeName = taskList.map((task) => {
    const assignedToEmployee = getEmployeeByEmployeeId(task.assigned_to);

    return {
      ...task,
      assigned_to_name: assignedToEmployee.employee_name,
    };
  });

  return (
    <>
      <Card className="bg-[#F2EAE5] mt-12">
        <CardContent>
          <DataTable columns={columns} data={updateTaskListWithEmployeeName} employeeList={employeeList} className="" />
        </CardContent>
      </Card>
    </>
  );
};

export default TaskPage;
