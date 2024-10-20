import React from "react";

import background from "@/public/pattern.svg";
import CheckAuth from "@/hoc/checkAuth";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center  family-poppins" style={{
      backgroundImage: `url(${background.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: "100vh",
      width: "100%",
    }}
    >
      <CheckAuth>
        {children}
      </CheckAuth>
    </div>
  );
};

export default Layout;
