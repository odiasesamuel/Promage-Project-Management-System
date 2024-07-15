import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ConfirmLogoutButton from "./confirmLogoutButton";

type LogoutConfirmationProps = {
  children: React.ReactNode;
};

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({ children }) => {
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

export default LogoutConfirmation;
