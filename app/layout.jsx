import CheckAuth from "@/hoc/checkAuth";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

import { Toaster } from "@/components/ui/toaster"

import { Poppins } from "next/font/google"
import StoreProvider from "./redux/store/storeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})


export const metadata = {
  title: "Clay Inn Dashboard",
  description: "A Hotel Management Dashboard for Clay Inn Hotels",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${poppins.variable} family-poppins`} >
          <CheckAuth>
            <Suspense fallback={<Loading />}>
              {children}
              <Toaster />
            </Suspense>
          </CheckAuth>
        </body>
      </html>
    </StoreProvider>
  );
}
