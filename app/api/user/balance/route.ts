import { NextRequest, NextResponse } from "next/server";
import { getUserBalance } from "@/lib/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const telegramId = searchParams.get("telegramId") ?? "0";

  const balance = await getUserBalance(telegramId);
  return NextResponse.json(balance);
}
