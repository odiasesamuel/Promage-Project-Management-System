"use client";

import { clearOrganisationDataAction } from "@/actions/employee";
import { AlertDialogAction } from "./ui/alert-dialog";

const ConfirmClearDataButton: React.FC<{ organisation_id: string }> = ({ organisation_id }) => {
  const logoutHandler = () => {
    clearOrganisationDataAction(organisation_id);
  };
  return <AlertDialogAction onClick={logoutHandler}>Confirm</AlertDialogAction>;
};

export default ConfirmClearDataButton;
