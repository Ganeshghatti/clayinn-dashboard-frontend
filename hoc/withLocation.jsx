"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

//  This is a high order component to protect routes for Location Admins and its still in progress.

const withLocation = (WrappedComponent) => {
  const HOC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const location = "mumbai";
      const token = "user";

      if (token !== "super-admin") {
        router.push("/");
        console.log(prob);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withLocation;
