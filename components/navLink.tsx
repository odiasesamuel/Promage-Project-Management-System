"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLinkType = {
  activeIcon: string;
  notActiveIcon: string;
  href: string;
  alt: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkType> = ({ activeIcon, notActiveIcon, href, alt, children }) => {
  const path = usePathname();

  return (
    <Link href={href}>
      <div className={`${path === href && "bg-white rounded-full"} w-[90%] h-[50px] flex items-center`}>
        <Image src={path == href ? activeIcon : notActiveIcon} alt={alt} className="mx-4" priority />
        <span className={`${path === href ? "text-[#E65F2B]" : "text-[#F1F1F1]"} text-sm`}>{children}</span>
      </div>
    </Link>
  );
};

export default NavLink;
