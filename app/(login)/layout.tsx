import type { Metadata } from "next";
import { inter } from "@/font/font";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import Introduction from "@/components/introduction";

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
            <Introduction />
          </div>
          <div className="bg-[#FAFFFB] col-start-7 col-end-13 grid place-content-center">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
