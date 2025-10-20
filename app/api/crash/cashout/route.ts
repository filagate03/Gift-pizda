import { NextResponse } from "next/server";
import { crashCashout } from "../../../../../lib/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const bet = typeof body?.bet === "number" ? body.bet : 0;
  const result = await crashCashout(bet);
  return NextResponse.json(result);
}
