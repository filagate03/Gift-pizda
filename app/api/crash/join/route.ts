import { NextResponse } from "next/server";
import { joinCrashRound } from "../../../../../lib/server";

export async function POST() {
  const result = await joinCrashRound();
  return NextResponse.json(result);
}
