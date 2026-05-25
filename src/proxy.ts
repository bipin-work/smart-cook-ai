import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedPaths = [
  /\/my-recipes/,
  /\/dashboard/,
  /\/add-recipe/,
  /\/pantry/,
  /\/compare-recipes/,
  /\//,
];

export const proxy = auth((request) => {
  const session = request.auth;
  const { pathname } = request.nextUrl;

  if (!session && protectedPaths.some((p) => p.test(pathname))) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/my-recipes/:path*"],
};
