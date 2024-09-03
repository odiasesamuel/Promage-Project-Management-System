"use client";

import AddEmployeeForm from "@/components/form/addEmployeeForm";
import RemoveEmployeeForm from "@/components/form/removeEmployeeForm";
import EmployeeList from "@/components/employeeList";
import { useEmployeeContext } from "@/context/employeeContext";
import { useRouter } from "next/navigation";

const ResourceMgnt: React.FC<{}> = () => {
  const { employeeDetails } = useEmployeeContext();

  const router = useRouter();

  if (employeeDetails.job_title !== "Administrator") router.push("/dashboard");

  return (
    <>
      <div className="flex flex-col mt-10">
        <EmployeeList />
        <div className="my-20 ml-auto">
          <AddEmployeeForm />
          <RemoveEmployeeForm />
        </div>
      </div>
    </>
  );
};

export default ResourceMgnt;
