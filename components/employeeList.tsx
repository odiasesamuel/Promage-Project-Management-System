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
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "employee" }, (payload) => {
        const newEmployee = payload.new as EmployeeListType;

        setEmployeeList((prevEmployee) => {
          let updatedEmployeeList;

          updatedEmployeeList = prevEmployee.map((employee) => (employee.id === newEmployee.id ? newEmployee : employee));

          return updatedEmployeeList;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
