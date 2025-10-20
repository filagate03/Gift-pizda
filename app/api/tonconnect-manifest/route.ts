import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { protocol, host } = request.nextUrl;
  const baseUrl = `${protocol}//${host}`;

  return NextResponse.json({
    url: baseUrl,
    name: "GiftUp TON Mini App",
    iconUrl: `${baseUrl}/icons/tonconnect-icon.svg`,
    termsOfUseUrl: `${baseUrl}/legal/terms`,
    privacyPolicyUrl: `${baseUrl}/legal/privacy`,
    manifestVersion: 1,
    description: "Прозрачная mini app платформа для подарков и игр на TON"
  });
}
