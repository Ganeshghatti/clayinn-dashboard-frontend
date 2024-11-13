"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";

export default function Auth_Check({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const URL = process.env.NEXT_PUBLIC_URL;
  if (!URL) {
    console.error("NEXT_PUBLIC_URL environment variable is not defined.");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const checkTokenExpiry = (token) => {
    try {
      const decoded = jwt.decode(token);
      if (!decoded) return true;
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh-token");
      if (!refresh_token) {
        console.error("No refresh token found.");
        return false;
      }

      const response = await axios.post(
        `${URL}/user-management/token/refresh/`,
        {
          refresh: refresh_token,
        }
      );

      const newAccessToken = response.data.access;
      localStorage.setItem("access-token", newAccessToken);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn("Refresh token expired or invalid, logging out.");
        logoutAndRedirect();
      } else {
        console.error("Token refresh failed:", error.response?.data || error);
      }
      return false;
    }
  };

  const logoutAndRedirect = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    router.push("/auth/login");
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const access_token = localStorage.getItem("access-token");
      const refresh_token = localStorage.getItem("refresh-token");

      if (!access_token || !refresh_token) {
        console.warn("No access or refresh token found, redirecting to login.");
        logoutAndRedirect();
        return;
      }

      const isTokenExpired = checkTokenExpiry(access_token);
      if (isTokenExpired) {
        const refreshSuccess = await refreshAccessToken();
        if (!refreshSuccess) {
          return;
        }
      }

      const updatedAccessToken = localStorage.getItem("access-token");
      const user = jwt.decode(updatedAccessToken);
      if (
        !user ||
        (user.role !== "super-admin" && !pathname.includes("/auth"))
      ) {
        logoutAndRedirect();
      }
    };

    if (isClient) {
      checkAuthStatus();
    }
  }, [isClient, router, pathname]);

  if (!isClient) return null;

  return <>{children}</>;
}
