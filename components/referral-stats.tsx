"use client";

import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ReferralResponse = {
  code: string;
  url: string;
  levels: Array<{
    level: number;
    count: number;
    rewardRate: number;
    volume: number;
  }>;
  bonusPercent: number;
};

export function ReferralStats() {
  const { data } = useSWR<ReferralResponse>("/api/user/referrals", fetcher, {
    refreshInterval: 15000
  });

  const totalReferrals = useMemo(() => {
    return data?.levels.reduce((sum, level) => sum + level.count, 0) ?? 0;
  }, [data]);

  return (
    <section className="rounded-3xl bg-white/5 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Реферальная программа</h2>
          <p className="text-sm text-white/60">Ваша ссылка: {data?.url ?? "—"}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {data?.levels.map((level) => (
            <div key={level.level} className="rounded-3xl bg-black/50 p-4">
              <p className="text-sm text-white/60">Уровень {level.level}</p>
              <p className="text-2xl font-semibold">{level.rewardRate}%</p>
              <p className="text-xs text-white/50">Активных: {level.count}</p>
              <p className="text-xs text-white/50">Оборот: {level.volume} TON</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-primary/30 p-4">
          <p className="text-sm text-white/70">
            Бонус за активных рефералов: +{data?.bonusPercent ?? 0}% (за каждые 10 активных)
          </p>
          <p className="text-sm text-white/60">Всего рефералов: {totalReferrals}</p>
        </div>
      </div>
    </section>
  );
}
