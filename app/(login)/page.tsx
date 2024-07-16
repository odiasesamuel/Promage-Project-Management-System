"use client";

import SignInForm from "@/components/signInForm";
import SignUpForm from "@/components/signUpForm";
import Image from "next/image";
import logoIcon from "@/assets/logo.svg";
import { useState } from "react";

export function AuthPage() {
  const [mode, setMode] = useState("signin");
  const changeModeToSignupHandler = () => {
    setMode("signup");
  };
  const changeModeToSigninHandler = () => {
    setMode("signin");
  };

  return (
    <>
      <div className="flex items-center mb-3">
        <Image src={logoIcon} alt="Logo of promage" />
        <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
      </div>
      <div className="flex flex-col items-center">
        {mode === "signin" && <SignInForm />}
        {mode === "signup" && <SignUpForm />}
        {mode === "signin" && (
          <p className="text-black text-sm mt-6">
            Don't have an account?
            <span className="text-[#E65F2B] cursor-pointer underline underline-offset-4 ml-1" onClick={changeModeToSignupHandler}>
              Sign up your organization
            </span>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-black text-sm mt-6">
            Already part of an organization?
            <span className="text-[#E65F2B] cursor-pointer underline underline-offset-4 ml-1" onClick={changeModeToSigninHandler}>
              Sign in
            </span>
          </p>
        )}
      </div>
    </>
  );
}

export default AuthPage;
