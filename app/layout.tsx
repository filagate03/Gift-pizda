import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { TelegramProvider } from "../components/telegram-provider";

export const metadata: Metadata = {
  title: "GiftUp TON Mini App",
  description: "Provably fair gifting platform on TON"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
