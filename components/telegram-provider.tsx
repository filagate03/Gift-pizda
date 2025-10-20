"use client";

import { ReactNode, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { TelegramContext } from "../hooks/use-telegram";

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<WebApp.WebAppUser | undefined>();

  useEffect(() => {
    try {
      if (!WebApp.initDataUnsafe.user) {
        WebApp.expand();
      }
      if (!WebApp.initDataUnsafe.user && process.env.NODE_ENV !== "production") {
        setUser({
          id: 0,
          first_name: "Demo",
          last_name: "User",
          username: "demo_user",
          language_code: "ru"
        } as WebApp.WebAppUser);
      } else {
        setUser(WebApp.initDataUnsafe.user);
      }
      WebApp.ready();
    } catch (error) {
      console.error("Telegram WebApp SDK init error", error);
    } finally {
      setReady(true);
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp: WebApp, user, ready }}>
      {children}
    </TelegramContext.Provider>
  );
}
