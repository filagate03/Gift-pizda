import { NextResponse } from "next/server";
import { verifyProvablyFair } from "@/lib/server";

export async function POST(request: Request) {
  const { seed, hash, clientSeed } = await request.json();

  if (!seed || !hash) {
    return NextResponse.json({ error: "seed and hash are required" }, { status: 400 });
  }

  const verification = await verifyProvablyFair(seed, hash, clientSeed);
  return NextResponse.json(verification);
}
