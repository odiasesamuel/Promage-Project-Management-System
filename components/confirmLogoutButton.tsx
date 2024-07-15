"use client";

import { signout } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { AlertDialogAction } from "./ui/alert-dialog";

const ConfirmLogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    const result = await signout();
    if (result.success) router.push("/");
  };
  return <AlertDialogAction onClick={logoutHandler}>Confirm</AlertDialogAction>;
};

export default ConfirmLogoutButton;
