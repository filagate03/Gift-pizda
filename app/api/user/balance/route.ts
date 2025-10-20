import { NextRequest, NextResponse } from "next/server";
import { getUserBalance } from "../../../../lib/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const telegramId = searchParams.get("telegramId");

  if (!telegramId) {
    return NextResponse.json({ error: "telegramId is required" }, { status: 400 });
  }

  const balance = await getUserBalance(telegramId);
  return NextResponse.json(balance);
}
