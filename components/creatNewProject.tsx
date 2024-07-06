import { Copy } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewPostForm from "./newPostForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import newProjectIcon from "@/assets/crosss.svg";

type CreatNewProjectProps = {
  children: React.ReactNode;
};

const CreatNewProject: React.FC<CreatNewProjectProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          {/* <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <NewPostForm />
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreatNewProject;
