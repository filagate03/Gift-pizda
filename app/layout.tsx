import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TelegramProvider } from "../components/telegram-provider";

const DEFAULT_HOST =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  process.env.NETLIFY_SITE_URL ||
  "http://localhost:3000";

const manifestUrl =
  process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST ?? `${DEFAULT_HOST.replace(/\/$/, "")}/api/tonconnect-manifest`;

export const metadata: Metadata = {
  title: "GiftUp TON Mini App",
  description: "Provably fair gifting platform on TON"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <TelegramProvider>{children}</TelegramProvider>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
