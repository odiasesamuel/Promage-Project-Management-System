import Image from "next/image";
import authImage from "@/assets/undraw_authentication_re_svpt.svg";
import logoIcon from "@/assets/logo.svg";

const Introduction: React.FC<{}> = () => {
  return (
    <>
      <div className="w-[45%] mx-auto">
        <Image src={authImage} alt="login image" className="w-full h-auto" priority />
      </div>
      <div className="w-[70%] mx-auto mt-8">
        <div className="flex items-center mb-3">
          <Image src={logoIcon} alt="Logo of promage" priority />
          <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
        </div>
        <p className="text-[#9A9A9A] text-sm text-center">Streamline your workflows, and elevate your team&apos;s productivity with intuitive tools and real-time collaboration.</p>
      </div>
    </>
  );
};

export default Introduction;
