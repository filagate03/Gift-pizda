import { NextResponse } from "next/server";
import { getReferralStats } from "../../../../lib/server";

export async function GET() {
  const stats = await getReferralStats();
  return NextResponse.json(stats);
}
