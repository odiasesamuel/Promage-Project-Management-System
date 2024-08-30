import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId, getAllEmployee } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { EmployeeListType } from "../layout";
import AddEmployeeForm from "@/components/form/addEmployeeForm";
import RemoveEmployeeForm from "@/components/form/removeEmployeeForm";
import EmployeeList from "@/components/employeeList";

const ResourceMgnt: React.FC<{}> = async () => {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeSignInDetailsType = await getEmployeeByEmployeeId(result.user.id);
  const organisation_id = employeeDetails.organisation_id;
  const employeeList: EmployeeListType[] = await getAllEmployee(organisation_id);
  if (employeeDetails.job_title !== "Administrator") {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="flex flex-col mt-10">
        <EmployeeList employeeListData={employeeList} />
        <div className="my-20 ml-auto">
          <AddEmployeeForm organisation_id={organisation_id} />
          <RemoveEmployeeForm organisation_id={organisation_id} employeeList={employeeList} />
        </div>
      </div>
    </>
  );
};

export default ResourceMgnt;
