import { NextResponse } from "next/server";
import { joinCrashRound } from "@/lib/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const bet = typeof body?.bet === "number" ? body.bet : 0;
  const result = await joinCrashRound(bet);
  return NextResponse.json(result);
}
