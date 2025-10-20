import { NextResponse } from "next/server";
import { getCrashStatus } from "@/lib/server";

export async function GET() {
  const status = await getCrashStatus();
  return NextResponse.json(status);
}
