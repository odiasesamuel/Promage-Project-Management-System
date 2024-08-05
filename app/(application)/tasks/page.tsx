import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId, getAllEmployee } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { EmployeeListType } from "../layout";
import { Button } from "@/components/ui/button";
import { getEmployeeInitials } from "@/utils/getEmployeeInitials";
import AddEmployeeForm from "@/components/form/addEmployeeForm";
import RemoveEmployeeForm from "@/components/form/removeEmployeeForm";

const TaskPage: React.FC<{}> = async () => {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeSignInDetailsType = getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employeeList: EmployeeListType[] = getAllEmployee(organisation_id);

  return (
    <>
      <div className="flex flex-col mt-10">
        <div className="flex flex-wrap gap-10">
          {employeeList.map((employee) => (
            <div key={employee.id} className="flex items-center justify-center bg-[#F2EAE5] text-[#E65F2B] text-6xl w-[200px] h-[200px] rounded-full">
              {getEmployeeInitials(employee.employee_name)}
            </div>
          ))}
        </div>

        <div className="my-20 ml-auto">
          <AddEmployeeForm organisation_id={organisation_id} />
          <RemoveEmployeeForm organisation_id={organisation_id} employeeList={employeeList} />
        </div>
      </div>
    </>
  );
};

export default TaskPage;
