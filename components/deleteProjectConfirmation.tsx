import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog";

type DeleteProjectConfirmationProps = {
  children: React.ReactNode;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  content: string;
};

const DeleteProjectConfirmation: React.FC<DeleteProjectConfirmationProps> = ({ children, deleteHandler, content }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Permanently delete this {content}?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this {content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteHandler}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectConfirmation;
