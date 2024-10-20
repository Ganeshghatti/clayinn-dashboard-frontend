import CheckAuth from "@/hoc/checkAuth";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";


export const metadata = {
  title: "Clay Inn Dashboard",
  description: "A Hotel Management Dashboard for Clay Inn Hotels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="family-poppins" >
        <CheckAuth>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </CheckAuth>
      </body>
    </html>
  );
}
