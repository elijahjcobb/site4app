import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;

  if (path === "/") {
    // trying to go to home
    let url = "/about";
    if (request.cookies.has("appId") && request.cookies.has("authorization"))
      url = "/dashboard";
    return NextResponse.redirect(new URL(url, request.url));
  } else if (path.startsWith("/dashboard")) {
    let url: string | undefined;
    if (!request.cookies.has("authorization")) url = "/sign-in";
    else if (!request.cookies.has("appId")) url = "/apps";
    if (!url) return NextResponse.next();
    return NextResponse.redirect(new URL(url, request.url));
  } else if (path.startsWith("/apps")) {
    if (!request.cookies.has("authorization"))
      return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/apps", "/apps/create", "/dashboard", "/dashboard/(.*)"],
};
