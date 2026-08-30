import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  const destination = request.nextUrl.clone();
  destination.pathname = destination.pathname.replace(/\/kvittering\/?$/, "");
  destination.search = "";

  return NextResponse.redirect(destination, 307);
}

export const config = {
  matcher: "/snart-slutt-pa-sykepengene/kvittering",
};
