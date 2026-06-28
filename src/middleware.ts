import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { legacyContractPaths } from "@/lib/contracts";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const redirectTo = legacyContractPaths[pathname];

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contratos/:path*"],
};
