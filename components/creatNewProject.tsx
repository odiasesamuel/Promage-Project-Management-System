"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewProjectForm from "./form/newProjectForm";
import { useState } from "react";
import { EmployeeListType } from "@/app/(application)/layout";

type CreatNewProjectProps = {
  children: React.ReactNode;
  employeeList: EmployeeListType[];
  projectFormHeading: string;
};

const CreatNewProject: React.FC<CreatNewProjectProps> = ({ children, employeeList, projectFormHeading }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{projectFormHeading}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <NewProjectForm employeeList={employeeList} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatNewProject;
