import { NextResponse } from "next/server";
import { openCase } from "@/lib/server";

export async function POST(request: Request) {
  const body = await request.json();
  const caseId = body.caseId;

  if (!caseId) {
    return NextResponse.json({ error: "caseId is required" }, { status: 400 });
  }

  try {
    const result = await openCase(caseId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to open case" }, { status: 500 });
  }
}
