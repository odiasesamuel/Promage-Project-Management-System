import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog";
import { ConfirmLogoutButton, ConfirmClearDataButton } from "./confirmationButton";

type LogoutConfirmationProps = {
  children: React.ReactNode;
};

type ClearDataConfirmationProps = {
  children: React.ReactNode;
  organisation_id: string;
};

type DeleteProjectOrTaskConfirmationProps = {
  children: React.ReactNode;
  deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  content: string;
};

export const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({ children }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm sign out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ConfirmLogoutButton />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ClearDataConfirmation: React.FC<ClearDataConfirmationProps> = ({ children, organisation_id }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Fiscal Year Data Wipe</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Are you sure you want to clear organisation data?</p>
            <p className="text-xs text-destructive">This operation is to be performed at the ending of the fiscal year</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ConfirmClearDataButton organisation_id={organisation_id} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DeleteProjectOrTaskConfirmation: React.FC<DeleteProjectOrTaskConfirmationProps> = ({ children, deleteHandler, content }) => {
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
