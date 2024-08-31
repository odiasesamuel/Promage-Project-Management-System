"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavLink from "./navLink";
import CreatNewProject from "../creatNewProject";
import logoIcon from "@/assets/logo.svg";
import newProjectIcon from "@/assets/crosss.svg";
import dashboardIconActive from "@/assets/dashboard.svg";
import dashboardIconNotActive from "@/assets/dashoardnotactive.svg";
import projectIconAcvtive from "@/assets/project.svg";
import projectIconNotActive from "@/assets/projectnotactive.svg";
import taskIconActive from "@/assets/tasckActive.svg";
import taskIconNotActive from "@/assets/task.svg";
import timeLogIconActive from "@/assets/timelogactive.svg";
import timeLogIconNotActive from "@/assets/timelog.svg";
import resourceMgtIconActive from "@/assets/resourcemgtactive.svg";
import resourceMgtIconNotActive from "@/assets/resourceMgt.svg";
import usersIconActive from "@/assets/usersactive.svg";
import usersIconNotActive from "@/assets/users.svg";
import sidebarBavArrow from "@/assets/arrow.svg";
import { LogoutConfirmation, ClearDataConfirmation } from "../confirmationDialog";
import { LogOut } from "lucide-react";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { EmployeeListType } from "@/app/(application)/layout";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabaseClient";

type NavBarProps = {
  className?: string;
  employeeListData: EmployeeListType[];
  employeeDetails: EmployeeSignInDetailsType;
};

const NavBar: React.FC<NavBarProps> = ({ className, employeeListData, employeeDetails }) => {
  const [employeeList, setEmployeeList] = useState(employeeListData);

  useEffect(() => {
    const channel = supabase
      .channel("create-project-form-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "employee" }, (payload) => {
        console.log(payload);
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
    <>
      <div className={`${className} relative`}>
        <div className="flex items-center ml-4 mt-8 relative">
          <Image src={logoIcon} alt="Logo of promage" priority />
          <h1 className="ml-1 text-2xl font-medium text-[#F1F1F1]">Promage</h1>
          <div className="w-8 h-8 rounded-full bg-white absolute right-[-16px] flex items-center justify-center">
            <Image src={sidebarBavArrow} alt="navigation sidebar icon" />
          </div>
        </div>
        <CreatNewProject employeeList={employeeList} projectFormHeading="Create a new project">
          <div className="bg-white w-[85%] h-[50px] ml-4 mt-16 mb-12 rounded-full flex items-center cursor-pointer">
            <Image src={newProjectIcon} alt="new project icon" className="mx-2" />
            <span className="text-sm text-black">
              Create new <br /> project
            </span>
          </div>
        </CreatNewProject>
        <nav className="ml-4 flex flex-col gap-3">
          <NavLink activeIcon={dashboardIconActive} notActiveIcon={dashboardIconNotActive} href="/dashboard" alt="dashboard icon">
            Dashboard
          </NavLink>
          <NavLink activeIcon={projectIconAcvtive} notActiveIcon={projectIconNotActive} href="/project" alt="project icon">
            Projects
          </NavLink>
          <NavLink activeIcon={taskIconActive} notActiveIcon={taskIconNotActive} href="/tasks" alt="task icon">
            Tasks
          </NavLink>
          {/* Implement time sheet at a later date */}
          {/* <NavLink activeIcon={timeLogIconActive} notActiveIcon={timeLogIconNotActive} href="/time-log" alt="time log icon">
            Time log
          </NavLink> */}
          {employeeDetails.job_title === "Administrator" && (
            <NavLink activeIcon={resourceMgtIconActive} notActiveIcon={resourceMgtIconNotActive} href="/resource-mgnt" alt="time log icon">
              Resource mgnt
            </NavLink>
          )}
          <div className="ml-4 absolute bottom-10">
            {employeeDetails.job_title === "Administrator" && (
              <ClearDataConfirmation organisation_id={employeeDetails.organisation_id}>
                <Button variant="destructive">Clear data</Button>
              </ClearDataConfirmation>
            )}
            <LogoutConfirmation>
              <div className="flex items-center gap-2  cursor-pointer mt-5">
                <LogOut />
                <span className="text-[#F1F1F1] text-sm">Sign out</span>
              </div>
            </LogoutConfirmation>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
