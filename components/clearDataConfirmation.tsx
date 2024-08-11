import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ConfirmClearDataButton from "./confirmClearDataButton";

type ClearDataConfirmationProps = {
  children: React.ReactNode;
  organisation_id: string;
};

const ClearDataConfirmation: React.FC<ClearDataConfirmationProps> = ({ children, organisation_id }) => {
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

export default ClearDataConfirmation;
