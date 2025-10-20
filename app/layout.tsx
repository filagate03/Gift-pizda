import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { TonConnectProvider } from "@tonconnect/ui-react";
import { TelegramProvider } from "../components/telegram-provider";

const DEFAULT_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const manifestUrl =
  process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST ?? `${DEFAULT_APP_URL.replace(/\/$/, "")}/api/tonconnect-manifest`;

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
