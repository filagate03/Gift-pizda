"use client";

import { ReactNode, useEffect, useState } from "react";
import { TelegramContext } from "../hooks/use-telegram";
import { getDemoUser, getTelegramWebApp, type TelegramUser } from "@/lib/telegram";

const DEMO_USER = getDemoUser();

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | undefined>();
  const [webApp] = useState(() => getTelegramWebApp());

  useEffect(() => {
    try {
      if (!webApp.initDataUnsafe.user) {
        webApp.expand();
        setUser(DEMO_USER);
      } else {
        setUser(webApp.initDataUnsafe.user);
      }
      webApp.ready();
    } catch (error) {
      console.error("Telegram WebApp init error", error);
      setUser(DEMO_USER);
    } finally {
      setReady(true);
    }
  }, [webApp]);

  return (
    <TelegramContext.Provider value={{ webApp, user, ready }}>
      {children}
    </TelegramContext.Provider>
  );
}
