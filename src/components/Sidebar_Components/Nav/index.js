"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import { ShieldCheck } from "lucide-react";

export default function Nav({ locationId, pathname }) {
  const isAdmin = () => {
    const token = getAccessToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded.role == "super-admin" ? true : false;
  };
  return (
    <div className="space-y-8 h-full mt-12">
      {navLinks.map((eachLink) => {
        return (
          <Link
            key={eachLink?.id}
            href={`/location/${locationId}/${eachLink.link}`}
            className={`${
              eachLink.link === pathname.split("/")[3]
                ? "bg-mainBg text-black rounded-l-full h-12"
                : "text-mainBg "
            } flex items-center justify-start gap-2 transition-all duration-300 ease-linear px-10 text-sm ml-10 h-12`}
          >
            <span>{eachLink?.icon}</span>
            <span className="text-lg">{eachLink?.title}</span>
          </Link>
        );
      })}
      {isAdmin() && (
        <Link
          href={`/super_admin`}
          className={`text-mainBg 
  flex items-center justify-start gap-2 transition-all duration-300 ease-linear px-10 text-sm ml-10 h-12`}
        >
          <span><ShieldCheck size={22} /></span>
          <span className="text-lg">Super Admin</span>
        </Link>
      )}
    </div>
  );
}
