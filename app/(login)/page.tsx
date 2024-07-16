"use client";

import SignInForm from "@/components/signInForm";
import Image from "next/image";
import logoIcon from "@/assets/logo.svg";
import { useState } from "react";

export function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <>
      <div className="flex items-center mb-3">
        <Image src={logoIcon} alt="Logo of promage" />
        <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
      </div>
      <div className="flex flex-col items-center">
        {mode === "login" && <SignInForm />}
        <p className="text-black text-sm mt-6">
          Don't have an account?
          <span className="text-[#E65F2B] cursor-pointer underline underline-offset-4">Sign up your organization</span>
        </p>
      </div>
    </>
  );
}

export default AuthPage;
