"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewPostForm from "./form/newProjectForm";
import { useState } from "react";

type CreatNewProjectProps = {
  children: React.ReactNode;
};

const CreatNewProject: React.FC<CreatNewProjectProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <NewPostForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatNewProject;
