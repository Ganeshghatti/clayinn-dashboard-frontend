import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import Auth_Check from "@/components/Auth_Components/Auth_Check";
import Store_Provider from "./Store_Provider";

// TOASTER
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Clay Inn",
  description: "Clay Inn Internal System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-mainBg">
        <Auth_Check>
          <Suspense fallback={<Loading />}>
            <Store_Provider>
              {children}
              <Toaster />
            </Store_Provider>
          </Suspense>
        </Auth_Check>
      </body>
    </html>
  );
}
