"use client";

import { signout } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { AlertDialogAction } from "./ui/alert-dialog";
import { clearOrganisationDataAction } from "@/actions/employee";

export const ConfirmLogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    const result = await signout();
    if (result.success) router.push("/");
  };
  return <AlertDialogAction onClick={logoutHandler}>Confirm</AlertDialogAction>;
};

export const ConfirmClearDataButton: React.FC<{ organisation_id: string }> = ({ organisation_id }) => {
  const clearDataHandler = () => {
    clearOrganisationDataAction(organisation_id);
  };
  return <AlertDialogAction onClick={clearDataHandler}>Confirm</AlertDialogAction>;
};
