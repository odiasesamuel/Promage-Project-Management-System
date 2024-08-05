import Image from "next/image";
import NavLink from "../navLink";
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
import LogoutConfirmation from "../logoutConfirmation";
import { LogOut } from "lucide-react";
import { EmployeeListType } from "@/app/(application)/layout";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";

type NavBarProps = {
  className?: string;
  employeeList: EmployeeListType[];
  employeeDetails: EmployeeSignInDetailsType;
};

const NavBar: React.FC<NavBarProps> = ({ className, employeeList, employeeDetails }) => {
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
          <NavLink activeIcon={timeLogIconActive} notActiveIcon={timeLogIconNotActive} href="/time-log" alt="time log icon">
            Time log
          </NavLink>
          {employeeDetails.job_title === "Administrator" && (
            <NavLink activeIcon={resourceMgtIconActive} notActiveIcon={resourceMgtIconNotActive} href="/resource-mgnt" alt="time log icon">
              Resource mgnt
            </NavLink>
          )}
          <LogoutConfirmation>
            <div className="ml-4 flex items-center gap-2 absolute bottom-10 cursor-pointer">
              <LogOut />
              <span className="text-[#F1F1F1] text-sm">Sign out</span>
            </div>
          </LogoutConfirmation>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
