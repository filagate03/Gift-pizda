"use client";

import { useTelegram } from "../hooks/use-telegram";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export function Header() {
  const { user } = useTelegram();
  const wallet = useTonWallet();
  const { data } = useSWR(user ? `/api/user/balance?telegramId=${user.id}` : null, fetcher, {
    refreshInterval: 15000
  });

  const tonBalance = data?.balance ?? 0;
  const usdBalance = data?.usd ?? 0;

  return (
    <header className="flex flex-col gap-4 rounded-3xl bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Добро пожаловать</p>
          <h1 className="text-2xl font-semibold">
            {user ? `${user.first_name} ${user.last_name ?? ""}`.trim() : "Гость"}
          </h1>
        </div>
        <TonConnectButton className="ml-auto" />
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
      {wallet && (
        <p className="text-xs text-white/50 break-all">
          Подключенный кошелек: {wallet.account.address}
        </p>
      )}
    </header>
  );
}
