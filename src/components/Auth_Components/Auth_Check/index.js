"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export default function Auth_Check({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const access_token = localStorage.getItem("access-token");
      const refresh_token = localStorage.getItem("refresh-token");
      const user = jwt.decode(access_token);

      if ((!access_token || !refresh_token) && !pathname.includes("/auth")) {
        router.push("/auth/login");
      } else if (!user) {
        router.push("/auth/login");
      } else if (
        !access_token &&
        !refresh_token &&
        user?.role !== "super-admin"
      ) {
        router.push("/auth/login");
      }
      //   } else if (
      //     access_token &&
      //     refresh_token &&
      //     user?.role === "super-admin"
      //   ) {
      //     router.push(`/location/${user?.locationId}/dashboard`);
      //   }
    }
  }, [isClient, router, pathname]);

  if (!isClient) return null;

  return <>{children}</>;
}
