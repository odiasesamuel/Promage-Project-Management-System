import type { Metadata } from "next";
import { inter } from "@/font/font";
import "../globals.css";
import NavBar from "@/components/layout/navBar";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { getEmployeeByEmployeeId, getAllEmployee } from "@/lib/employee";
import { EmployeeSignInDetailsType } from "@/actions/auth-action";

export const metadata: Metadata = {
  title: "Promage",
  description: "Promage is a project management application that helps streamline your workflows and elevate your team's productivity through real-time collaboration.",
  openGraph: {
    title: "Promage-Project-Management-System",
    description: "Streamline your workflows, and elevate your team's productivity with intuitive tools and real-time collaboration.",
    url: "https://promage-project-management-system.onrender.com/",
    siteName: "Promage",
    images: [
      {
        url: "https://rkmrzjsjtgpmcacoafpq.supabase.co/storage/v1/object/public/promage_img/promage_thumbnail_2.png",
        width: 800,
        height: 600,
        alt: "Streamline your workflows, and elevate your team's productivity with intuitive tools and real-time collaboration.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promage-Project-Management-System",
    description: "Streamline your workflows, and elevate your team's productivity with intuitive tools and real-time collaboration.",
    images: ["https://rkmrzjsjtgpmcacoafpq.supabase.co/storage/v1/object/public/promage_img/promage_thumbnail_2.png"],
  },
};

export type EmployeeListType = {
  id: string;
  organisation_id: string;
  employee_name: string;
  employee_email: string;
  job_title: string;
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
  const employeeDetails: EmployeeSignInDetailsType = await getEmployeeByEmployeeId(result.user.id);
  const employeeList: EmployeeListType[] = await getAllEmployee(employeeDetails.organisation_id);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#ebdfd7] text-white grid grid-cols-[repeat(12,_1fr)] grid-rows-[auto_1fr] min-h-screen">
          <Header className="bg-[#ebdfd7] col-start-3 lg:col-start-1 col-end-13 px-[3.5%] border-b border-[#D8CDC6]" employeeListData={employeeList} employeeDetails={employeeDetails}></Header>
          <NavBar className="bg-[#060606] col-start-1 col-end-3 row-start-1 row-end-3  lg:hidden" employeeListData={employeeList} employeeDetails={employeeDetails}></NavBar>
          <Main className="bg-[#ebdfd7] col-start-3 lg:col-start-1 col-end-13 px-[3.5%] overflow-y-auto">{children}</Main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
