"use client";

import { ReactNode, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { TelegramContext } from "../hooks/use-telegram";

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<WebApp.WebAppUser | undefined>();

  useEffect(() => {
    if (!WebApp.initDataUnsafe.user) {
      WebApp.expand();
    }
    setUser(WebApp.initDataUnsafe.user);
    WebApp.ready();
    setReady(true);
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp: WebApp, user, ready }}>
      {children}
    </TelegramContext.Provider>
  );
}
