"use client";

import { EmployeeListType } from "@/app/(application)/layout";
import { getEmployeeInitials } from "@/utils/getEmployeeInitials";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type EmployeeListProps = {
  employeeListData: EmployeeListType[];
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employeeListData }) => {
  const [employeeList, setEmployeeList] = useState(employeeListData);

  useEffect(() => {
    const channel = supabase
      .channel("resource-mgt-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "employee" }, (payload) => {
        const newEmployee = payload.new as EmployeeListType;

        setEmployeeList((prevEmployee) => {
          let updatedEmployeeList;

          switch (payload.eventType) {
            case "INSERT":
              updatedEmployeeList = [newEmployee, ...prevEmployee];
              break;
            case "UPDATE":
              updatedEmployeeList = prevEmployee.map((project) => (project.id === newEmployee.id ? newEmployee : project));
              break;
            case "DELETE":
              updatedEmployeeList = prevEmployee.filter((project) => project.id !== payload.old.id);
              break;
            default:
              updatedEmployeeList = prevEmployee;
          }
          return updatedEmployeeList;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-10 md:gap-8 sm:gap-6">
      {employeeList.map((employee) => (
        <div key={employee.id} className="flex items-center justify-center bg-[#F2EAE5] text-[#E65F2B] text-6xl xl:text-5xl md:text-4xl sm:text-3xl 2xs:text-2xl w-[200px] h-[200px] xl:w-[170px] xl:h-[170px] lg:w-[150px] lg:h-[150px] md:w-[120px] md:h-[120px] sm:w-[100px] sm:h-[100px] 2xs:w-[90px] 2xs:h-[90px] 3xs:w-[80px] 3xs:h-[80px] rounded-full">
          {getEmployeeInitials(employee.employee_name)}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
