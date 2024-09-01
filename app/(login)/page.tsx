import Link from "next/link";
import SignInForm from "@/components/form/signInForm";
import SignUpForm from "@/components/form/signUpForm";
import Image from "next/image";
import logoIcon from "@/assets/logo.svg";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type AuthPageProps = {
  searchParams: SearchParams;
};

function AuthPage({ searchParams }: AuthPageProps) {
  const mode = searchParams.mode || "signin";

  return (
    <>
      <div className="w-[450px] lg:w-[350px] md:w-[450px] xs:w-[350px] 2xs:w-[320px] 3xs:w-[280px]">
        <div className="flex items-center mb-3">
          <Image src={logoIcon} alt="Logo of promage" priority />
          <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
        </div>
        <p className="text-[#9A9A9A] text-sm text-center mb-3 hidden md:block">Streamline your workflows, and elevate your team&apos;s productivity with intuitive tools and real-time collaboration.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[450px] lg:w-[350px] md:w-[450px] xs:w-[350px] 2xs:w-[320px] 3xs:w-[280px]">
          {mode === "signin" && <SignInForm />}
          {mode === "signup" && <SignUpForm />}
        </div>
        {mode === "signin" && (
          <p className="text-black text-sm mt-6 text-center">
            Don&apos;t have an account?
            <Link href="/?mode=signup" className="text-[#E65F2B] cursor-pointer underline underline-offset-4 ml-1">
              Sign up your organization
            </Link>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-black text-sm mt-6 text-center">
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
