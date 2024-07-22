import Image from "next/image";
import profilePicture from "@/assets/Ellipse 3226.svg";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";

type HeaderProps = {
  className?: string;
  employeeDetails: EmployeeSignInDetailsType;
};

const Header: React.FC<HeaderProps> = ({ className, employeeDetails }) => {
  return (
    <header className={`${className} text-black flex items-center justify-between h-[80px]`}>
      <h1 className="text-[1.8rem] font-medium">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div>
          <input type="text" placeholder="Search for anything..." className="h-10 min-w-[300px] focus:outline-none pl-12 pr-5 text-sm placeholder:text-sm rounded-full" />
        </div>
        <div className="h-10 bg-white rounded-full flex items-center gap-2 min-w-44">
          <Image src={profilePicture} alt="profile picture" height={40} className="mt-[6px]" />
          <div>
            <h1 className="text-xs">{employeeDetails.employee_name}</h1>
            <p className="text-xs text-[#A1A3A5]">{employeeDetails.job_title}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
