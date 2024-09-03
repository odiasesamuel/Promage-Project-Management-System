"use client";

import { getEmployeeInitials } from "@/utils/getEmployeeInitials";
import { useEmployeeContext } from "@/context/employeeContext";

const EmployeeList: React.FC<{}> = () => {
  const { employeeList } = useEmployeeContext();

  return (
    <div className="flex flex-wrap gap-10">
      {employeeList.map((employee) => (
        <div key={employee.id} className="flex items-center justify-center bg-[#F2EAE5] text-[#E65F2B] text-6xl w-[200px] h-[200px] rounded-full">
          {getEmployeeInitials(employee.employee_name)}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
