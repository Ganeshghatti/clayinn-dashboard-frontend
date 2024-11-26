"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, clearTokens } from '@/utils/auth';

const PUBLIC_ROUTES = ['/auth/login', '/'];
const SUPER_ADMIN_ROUTES = ['/super_admin'];

export default function Auth_Check({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (PUBLIC_ROUTES.includes(pathname)) {
          setIsAuthorized(true);
          return;
        }

        const token = getAccessToken();
        if (!token) {
          throw new Error('No access token');
        }

        const decoded = jwtDecode(token);
        
        if (SUPER_ADMIN_ROUTES.includes(pathname)) {
          if (decoded.role !== 'super-admin') {
            throw new Error('Unauthorized: Super admin access required');
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        clearTokens();
        router.push('/auth/login');
      }
    };

    if (isClient) {
      checkAuthStatus();
    }
  }, [isClient, router, pathname]);

  if (!isClient || !isAuthorized) return null;

  return <>{children}</>;
}
