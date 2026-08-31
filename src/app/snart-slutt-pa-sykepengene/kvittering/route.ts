import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { publicEnv } from "@/constants/envs";

export function GET(request: NextRequest): NextResponse {
  const destination = new URL(
    `${publicEnv.NEXT_PUBLIC_BASE_PATH}/snart-slutt-pa-sykepengene`,
    request.url,
  );

  return NextResponse.redirect(destination, 307);
}
