import CheckAuth from "@/hoc/checkAuth";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

import { Roboto_Condensed } from "next/font/google"
import StoreProvider from "./redux/store/storeProvider";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
})


export const metadata = {
  title: "Clay Inn Dashboard",
  description: "A Hotel Management Dashboard for Clay Inn Hotels",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${roboto.variable} family-poppins`} >
          <CheckAuth>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </CheckAuth>
        </body>
      </html>
    </StoreProvider>
  );
}
