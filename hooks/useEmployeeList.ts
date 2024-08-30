import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { EmployeeListType } from "@/app/(application)/layout";
import { getEmployeeList } from "@/actions/employee";

export const useEmployeeList = (organisation_id: string) => {
  const [employeeList, setEmployeeList] = useState<EmployeeListType[]>([]);

  useEffect(() => {
    const fetchInitialEmployeeList = async () => {
      const initialEmployeeList = await getEmployeeList(organisation_id);
      setEmployeeList(initialEmployeeList);
    };

    fetchInitialEmployeeList();

    const channel = supabase
      .channel("employee-channel")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "employee" }, (payload) => {
        const newEmployee = payload.new as EmployeeListType;

        setEmployeeList((prevEmployee) => {
          return prevEmployee.map((employee) => (employee.id === newEmployee.id ? newEmployee : employee));
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [organisation_id]);

  return employeeList;
};
