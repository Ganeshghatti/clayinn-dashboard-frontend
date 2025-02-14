"use client";

import Image from "next/image";

import { useParams, usePathname } from "next/navigation";
import Nav from "../Nav";
import Logout from "@/components/Auth_Components/Logout";

import Link from "next/link";

import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

import logo from "/public/logo.png";
import { useEffect } from "react";
import { useState } from "react";
import { User } from "lucide-react";

import { DecodedToken } from "@/function/jwt";

export default function Large_Devices() {
  const { locationId } = useParams();
  const pathname = usePathname();

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    async function fetchDecodedToken() {
      try {
        const decoded = DecodedToken();
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    fetchDecodedToken();
  }, []);

  return (
    <div className="flex flex-col h-full overf">
      <div className="bg-black w-full h-[20vh] flex justify-center items-center rounded-t-2xl">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="w-[180px] h-[120px] object-contain"
          quality={100}
          priority
        />
      </div>
      <div className="flex flex-col justify-between h-full ">
        <div className="h-full overflow-y-scroll no-scrollbar">
          <Nav locationId={locationId} pathname={pathname} />
        </div>

        <div>
          <Logout className="rounded-b-2xl" />
        </div>
      </div>
    </div>
  );
}
