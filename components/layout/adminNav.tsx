"use client";

import { LogoutConfirmation, ClearDataConfirmation } from "../confirmationDialog";
import NavLink from "./navLink";
import resourceMgtIconActive from "@/assets/resourcemgtactive.svg";
import resourceMgtIconNotActive from "@/assets/resourceMgt.svg";
import { useEmployeeContext } from "@/context/employeeContext";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const AdminNav = () => {
  const { employeeDetails } = useEmployeeContext();
  return (
    <>
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
    </>
  );
};

export default AdminNav;
