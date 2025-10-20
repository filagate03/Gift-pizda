"use client";

import { createContext, useContext } from "react";
import { getTelegramWebApp, type TelegramUser, type TelegramWebApp } from "@/lib/telegram";

type TelegramContextValue = {
  webApp: TelegramWebApp;
  user?: TelegramUser;
  ready: boolean;
};

export const TelegramContext = createContext<TelegramContextValue | undefined>(
  undefined
);

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return context;
}

export function createInitialTelegramContext(): TelegramContextValue {
  const webApp = getTelegramWebApp();
  return {
    webApp,
    user: webApp.initDataUnsafe.user,
    ready: true
  };
}
