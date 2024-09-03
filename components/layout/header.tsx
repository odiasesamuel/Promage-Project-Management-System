import { getEmployeeInitials } from "@/utils/getEmployeeInitials";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";
import { EmployeeListType } from "@/app/(application)/layout";
import PageTitle from "./pageTitle";
import sidebarBavArrow from "@/assets/arrow.svg";
import Image from "next/image";
import MobileSideNavBar from "./mobileSideNavBar";

type HeaderProps = {
  className?: string;
  employeeListData: EmployeeListType[];
  employeeDetails: EmployeeSignInDetailsType;
};

const Header: React.FC<HeaderProps> = ({ className, employeeListData, employeeDetails }) => {
  return (
    <header className={`${className} text-black flex items-center justify-between h-[80px]`}>
      <div className="flex items-center gap-5">
        <MobileSideNavBar employeeListData={employeeListData} employeeDetails={employeeDetails} className="hidden lg:block">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Image src={sidebarBavArrow} className="rotate-180" alt="navigation sidebar icon" priority />
          </div>
        </MobileSideNavBar>
        <h1 className="text-[1.8rem] xs:text-2xl font-medium">
          <PageTitle />
        </h1>
      </div>
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