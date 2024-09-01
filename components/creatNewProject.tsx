"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewProjectForm from "./form/newProjectForm";
import { useState } from "react";
import { EditableProjectData } from "./columns";

type CreatNewProjectProps = {
  children: React.ReactNode;
  projectFormHeading: string;
  editableProjectData?: EditableProjectData;
};

const CreatNewProject: React.FC<CreatNewProjectProps> = ({ children, projectFormHeading, editableProjectData }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{projectFormHeading}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <NewProjectForm setOpen={setOpen} editableProjectData={editableProjectData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatNewProject;
