"use client";

import { createContext, useContext } from "react";
import type WebApp from "@twa-dev/sdk";

type TelegramContextValue = {
  webApp: typeof WebApp;
  user?: WebApp.WebAppUser;
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
