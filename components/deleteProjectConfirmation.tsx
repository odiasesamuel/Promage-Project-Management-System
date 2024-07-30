import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog";

type DeleteProjectConfirmationProps = {
  children: React.ReactNode;
  deleteProjectHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

const DeleteProjectConfirmation: React.FC<DeleteProjectConfirmationProps> = ({ children, deleteProjectHandler }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Permanently Delete This Project?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this project</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProjectHandler}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectConfirmation;
