import Link from "next/link";
import SignInForm from "@/components/signInForm";
import SignUpForm from "@/components/signUpForm";
import Image from "next/image";
import logoIcon from "@/assets/logo.svg";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type AuthPageProps = {
  searchParams: SearchParams;
};

export function AuthPage({ searchParams }: AuthPageProps) {
  const mode = searchParams.mode || "signin";

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
            <Link href="/?mode=signup" className="text-[#E65F2B] cursor-pointer underline underline-offset-4 ml-1">
              Sign up your organization
            </Link>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-black text-sm mt-6">
            Already part of an organization?
            <Link href="/?mode=signin" className="text-[#E65F2B] cursor-pointer underline underline-offset-4 ml-1">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

export default AuthPage;
