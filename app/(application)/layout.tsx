import type { Metadata } from "next";
import { inter } from "@/font/font";
import "../globals.css";
import NavBar from "@/components/layout/navBar";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId } from "@/lib/employee";
import { EmployeeDetailsType } from "@/actions/auth-action";

export const metadata: Metadata = {
  title: "Promage",
  description: "Project management application used to effectively organise and manage task accross teams",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }
  const employeeDetails: EmployeeDetailsType = getEmployeeByEmployeeId(result.user.id);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="text-white grid grid-cols-[repeat(12,_1fr)] grid-rows-[auto_1fr] min-h-screen">
          <Header className="bg-[#ebdfd7] col-start-3 col-end-13 px-[3%] border-b border-[#D8CDC6]" employeeDetails={employeeDetails}></Header>
          <NavBar className="bg-[#060606] col-start-1 col-end-3 row-start-1 row-end-3"></NavBar>
          <Main className="bg-[#ebdfd7] col-start-3 col-end-13 px-[3%] overflow-y-auto">{children}</Main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

// grid-cols-[repeat(12,_1fr)]
// col-[3_/_13] OR col-start-3 col-end-13
// col-[3_/_13] OR col-start-3 col-end-13
