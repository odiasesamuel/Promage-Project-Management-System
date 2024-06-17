import type { Metadata } from "next";
import { inter } from "@/font/font";
import "../globals.css";
import Image from "next/image";
import authImage from "@/assets/undraw_authentication_re_svpt.svg";
import logoIcon from "@/assets/logo.svg";

export const metadata: Metadata = {
  title: "Promage",
  description: "Project management application used to effectively organise and manage task accross teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" text-white grid grid-cols-[repeat(12,_1fr)] grid-rows-[auto] min-h-screen">
          <div className="bg-[#ebdfd7] col-start-1 col-end-7 grid place-content-center">
            <div className="w-[45%] mx-auto">
              <Image src={authImage} alt="login image" className="w-full h-auto" priority />
            </div>
            <div className="w-[70%] mx-auto mt-8">
              <div className="flex items-center mb-3">
                <Image src={logoIcon} alt="Logo of promage" priority />
                <h1 className="ml-1 text-2xl font-medium text-black">Promage</h1>
              </div>
              <p className="text-[#9A9A9A] text-sm text-center">Streamline your workflows, and elevate your team's productivity with intuitive tools and real-time collaboration.</p>
            </div>
          </div>
          <div className="bg-[#FAFFFB] col-start-7 col-end-13 grid place-content-center">{children}</div>
        </div>
      </body>
    </html>
  );
}