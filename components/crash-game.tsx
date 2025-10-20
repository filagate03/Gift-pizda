"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type CrashHistoryItem = {
  id: string;
  multiplier: number;
  seedHash: string;
  createdAt: string;
};

type CrashStatus = {
  multiplier: number;
  seedHash: string;
  serverSeed?: string;
  active: boolean;
};

export function CrashGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bet, setBet] = useState(1);
  const [autoCashout, setAutoCashout] = useState<number | null>(3);
  const { data: status } = useSWR<CrashStatus>("/api/crash/status", fetcher, {
    refreshInterval: 500
  });
  const { data: history } = useSWR<CrashHistoryItem[]>("/api/crash/history", fetcher, {
    refreshInterval: 5000
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !status) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const maxMultiplier = Math.max(status.multiplier, autoCashout ?? 1);
    const points = Array.from({ length: 50 }, (_, i) => ({
      x: (i / 49) * width,
      y: height - (Math.log(1 + (status.multiplier / maxMultiplier) * i) / Math.log(50)) * height
    }));

    ctx.strokeStyle = "#9C6BFF";
    ctx.lineWidth = 4;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }, [status, autoCashout]);

  const provablyFairInfo = useMemo(() => {
    if (!status) return null;
    return {
      hash: status.seedHash,
      seed: status.serverSeed
    };
  }, [status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl bg-white/5 p-4">
        <canvas ref={canvasRef} width={600} height={300} className="w-full" />
        <div className="mt-4 flex items-center justify-between text-lg font-semibold">
          <span>Текущий коэффициент: x{status?.multiplier.toFixed(2) ?? "--"}</span>
          <span className="text-accent">{status?.active ? "Игра в процессе" : "Раунд завершен"}</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/5 p-4">
          <h3 className="text-lg font-semibold">Ставка</h3>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={bet}
              onChange={(event) => setBet(Number(event.target.value))}
              className="w-full rounded-2xl bg-black/50 p-3"
            />
            <button className="rounded-2xl bg-accent px-4 py-3 font-semibold text-black">Играть</button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="number"
              min={1.1}
              step={0.1}
              value={autoCashout ?? ""}
              placeholder="Автовывод"
              onChange={(event) =>
                setAutoCashout(event.target.value ? Number(event.target.value) : null)
              }
              className="w-full rounded-2xl bg-black/50 p-3"
            />
            <button className="rounded-2xl bg-white/10 px-4 py-3 font-semibold">
              Забрать
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-white/5 p-4">
          <h3 className="text-lg font-semibold">Provably Fair</h3>
          <p className="mt-2 text-sm text-white/60">
            Хэш текущего раунда: <span className="font-mono">{provablyFairInfo?.hash ?? "—"}</span>
          </p>
          {provablyFairInfo?.seed && (
            <p className="text-sm text-white/60">
              Серверный seed: <span className="font-mono">{provablyFairInfo.seed}</span>
            </p>
          )}
          <p className="mt-2 text-xs text-white/50">
            После завершения раунда мы раскрываем seed для самостоятельной проверки честности
            через SHA256.
          </p>
        </div>
      </div>
      <div className="rounded-3xl bg-white/5 p-4">
        <h3 className="text-lg font-semibold">История раундов</h3>
        <ul className="mt-3 flex max-h-64 flex-col gap-2 overflow-auto text-sm text-white/70">
          {history?.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
              <span className="font-semibold text-accent">x{item.multiplier.toFixed(2)}</span>
              <span className="font-mono text-white/50">{item.seedHash}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
