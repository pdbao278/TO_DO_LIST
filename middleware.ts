import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirectTo = (url: string, request: NextRequest) => {
  return NextResponse.redirect(new URL(url, request.url));
};

export async function middleware(request: NextRequest) {
  console.log("server >> middleware", request.nextUrl.pathname);

  const nextUrl = request.nextUrl.pathname;
  const accessToken = (await cookies()).get("accessToken")?.value;
  let res = NextResponse.next();

  if (accessToken && nextUrl.startsWith("/auth")) {
    return redirectTo("/", request);
  }

  if (!accessToken && !nextUrl.startsWith("/auth")) {
    return redirectTo("/auth", request);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
