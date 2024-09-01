"use client";

import { getEmployeeInitials } from "@/utils/getEmployeeInitials";
import { useEmployeeContext } from "@/context/employeeContext";
import { usePathname } from "next/navigation";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { employeeDetails } = useEmployeeContext();
  const pathname = usePathname();

  return (
    <header className={`${className} text-black flex items-center justify-between h-[80px]`}>
      <h1 className="text-[1.8rem] font-medium">
        <span>
          {pathname === "/dashboard" && "Dashboard"}
          {pathname === "/project" && "Project"}
          {pathname === "/tasks" && "Task"}
          {pathname === "/time-log" && "Time Log"}
          {pathname === "/resource-mgnt" && "Resource Management"}
        </span>
      </h1>
      <div className="flex items-center h-10 bg-white rounded-full p-4 pl-2">
        <div key={employeeDetails.id} className="flex items-center justify-center bg-[#F2EAE5] text-[#E65F2B] text-xs rounded-full p-1 mr-2">
          {getEmployeeInitials(employeeDetails.employee_name)}
        </div>
        <div>
          <h1 className="text-xs">{employeeDetails.employee_name}</h1>
          <p className="text-xs text-[#A1A3A5]">{employeeDetails.job_title}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
