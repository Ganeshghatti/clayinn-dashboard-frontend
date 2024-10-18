import { NextResponse } from "next/server";

export function middleware(req) {
  // const token = req.cookies.getAll();
  // const role = "super-admin";
  // const location = "mumbai";
  // const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  // const locationParameter = segments[1];
  // if (req.nextUrl.pathname.startsWith("/locations")) {
  //   if (role === "super-admin") {
  //     return;
  //   }
  //   if (location !== locationParameter) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //     x;
  //   }
  //   return;
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
