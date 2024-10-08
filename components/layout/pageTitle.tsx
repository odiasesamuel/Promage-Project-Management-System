"use client";

import { usePathname } from "next/navigation";

const PageTitle = () => {
  const pathname = usePathname();
  return (
    <span>
      {pathname === "/dashboard" && "Dashboard"}
      {pathname === "/project" && "Project"}
      {pathname === "/tasks" && "Task"}
      {pathname === "/time-log" && "Time Log"}
      {pathname === "/resource-mgnt" && "Resource Mngt"}
    </span>
  );
};

export default PageTitle;
