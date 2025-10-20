import { NextResponse } from "next/server";
import { verifyProvablyFair } from "../../../../../lib/server";

export async function POST(request: Request) {
  const { seed, hash } = await request.json();

  if (!seed || !hash) {
    return NextResponse.json({ error: "seed and hash are required" }, { status: 400 });
  }

  const verification = await verifyProvablyFair(seed, hash);
  return NextResponse.json(verification);
}
