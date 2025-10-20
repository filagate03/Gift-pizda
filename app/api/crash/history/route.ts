import { NextResponse } from "next/server";
import { getCrashHistory } from "../../../../../lib/server";

export async function GET() {
  const history = await getCrashHistory();
  return NextResponse.json(history);
}
