import { NextResponse } from "next/server";
import { crashCashout } from "../../../../../lib/server";

export async function POST() {
  const result = await crashCashout();
  return NextResponse.json(result);
}
