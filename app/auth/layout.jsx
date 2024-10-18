import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-clayInnBackground family-poppins">
      {children}
    </div>
  );
};

export default Layout;
