"use client";

import jwt from "jsonwebtoken";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

//  This is a high order component to protect routes for Location Admins and its completed.
// If u want to create more routes that are for super-admin access only, kindly wrap the component with this High order component

const withAdmin = (WrappedComponent) => {
  const HOC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("access-token");
      const user = jwt.decode(token);

      const userRole = user?.role;

      if (userRole !== "super-admin") {
        router.push("/");
        console.log(userRole);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withAdmin;
