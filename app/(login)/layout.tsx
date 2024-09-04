import type { Metadata } from "next";
import { inter } from "@/font/font";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import Introduction from "@/components/introduction";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" text-white grid grid-cols-[repeat(12,_1fr)] grid-rows-[auto] min-h-screen">
          <div className="bg-[#ebdfd7] col-start-1 col-end-7 grid place-content-center md:hidden">
            <Introduction />
          </div>
          <div className="bg-[#FAFFFB] col-start-7 col-end-13 md:col-start-1 grid place-content-center my-5">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
