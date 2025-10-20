"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { useTelegram } from "../hooks/use-telegram";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

const DEMO_WALLET_ADDRESS = "UQDEMOFAKEWALLETADDRESS000000000";

export function Header() {
  const { user } = useTelegram();
  const { data } = useSWR(
    user ? `/api/user/balance?telegramId=${user.id}` : "/api/user/balance",
    fetcher,
    {
      refreshInterval: 15000
    }
  );

  const tonBalance = data?.balance ?? 0;
  const usdBalance = data?.usd ?? 0;

  const walletLabel = useMemo(() => {
    return `${DEMO_WALLET_ADDRESS.slice(0, 6)}...${DEMO_WALLET_ADDRESS.slice(-4)}`;
  }, []);

  return (
    <header className="flex flex-col gap-4 rounded-3xl bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Добро пожаловать</p>
          <h1 className="text-2xl font-semibold">
            {user ? `${user.first_name} ${user.last_name ?? ""}`.trim() : "Гость"}
          </h1>
        </div>
        <button className="ml-auto rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
          {walletLabel}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-light p-4">
          <p className="text-sm text-white/70">Баланс TON</p>
          <p className="text-3xl font-bold">{tonBalance.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-white/70">Эквивалент в USD</p>
          <p className="text-3xl font-bold">${usdBalance.toFixed(2)}</p>
        </div>
      </div>
      <p className="break-all text-xs text-white/50">Демо кошелек: {DEMO_WALLET_ADDRESS}</p>
    </header>
  );
}
