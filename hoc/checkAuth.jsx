"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";


export default function CheckAuth({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const token = localStorage.getItem("access-token");

        if (!token) {
            router.push("/auth/login");
        } else if (token && pathname === "/auth/login") {
            router.push("/super-admin");
        }
    }, [router]);

    return (
        <>
            {children}
        </>
    )
}

