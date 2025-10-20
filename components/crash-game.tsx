"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type CrashHistoryItem = {
  id: string;
  multiplier: number;
  seedHash: string;
  seed: string;
  createdAt: string;
};

type CrashStatus = {
  id: string;
  multiplier: number;
  seedHash: string;
  serverSeed: string | null;
  active: boolean;
  previousRound: {
    id: string;
    multiplier: number;
    seedHash: string;
    createdAt: string;
  } | null;
};

export function CrashGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bet, setBet] = useState(1);
  const [autoCashout, setAutoCashout] = useState<number | null>(3);
  const [joining, setJoining] = useState(false);
  const [cashoutMessage, setCashoutMessage] = useState<string | null>(null);
  const [autoCashoutTriggered, setAutoCashoutTriggered] = useState(false);

  const { data: status } = useSWR<CrashStatus>("/api/crash/status", fetcher, {
    refreshInterval: 500
  });
  const { data: history } = useSWR<CrashHistoryItem[]>("/api/crash/history", fetcher, {
    refreshInterval: 5000
  });

  useEffect(() => {
    if (!canvasRef.current || !status) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const maxMultiplier = Math.max(status.multiplier, autoCashout ?? 1);
    const points = Array.from({ length: 50 }, (_, i) => ({
      x: (i / 49) * width,
      y:
        height -
        (Math.log(1 + (status.multiplier / Math.max(maxMultiplier, 1)) * i) / Math.log(50)) * height
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

  useEffect(() => {
    if (!status) return;
    setCashoutMessage(null);
    setAutoCashoutTriggered(false);
  }, [status?.id]);

  const handleJoin = useCallback(async () => {
    setJoining(true);
    setCashoutMessage(null);
    try {
      const response = await fetch("/api/crash/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bet })
      });
      if (!response.ok) {
        throw new Error("Failed to join crash round");
      }
    } catch (error) {
      console.error(error);
      setCashoutMessage("Не удалось присоединиться к раунду");
    } finally {
      setJoining(false);
    }
  }, [bet]);

  const handleCashout = useCallback(
    async (auto = false) => {
      try {
        const response = await fetch("/api/crash/cashout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bet })
        });
        if (!response.ok) {
          throw new Error("Cashout failed");
        }
        const data = await response.json();
        const winnings = Number(data.winnings ?? bet * data.multiplier);
        const message = auto
          ? `Автовывод выполнен на x${Number(data.multiplier).toFixed(2)} (≈ ${winnings.toFixed(2)} TON)`
          : `Вы забрали ставку на x${Number(data.multiplier).toFixed(2)} (≈ ${winnings.toFixed(2)} TON)`;
        setCashoutMessage(message);
      } catch (error) {
        console.error(error);
        setCashoutMessage("Не удалось выполнить вывод");
        if (auto) {
          setAutoCashoutTriggered(false);
        }
      }
    },
    [bet]
  );

  useEffect(() => {
    if (!status || !autoCashout || autoCashoutTriggered) return;
    if (status.multiplier >= autoCashout) {
      setAutoCashoutTriggered(true);
      handleCashout(true).catch(() => {
        setAutoCashoutTriggered(false);
      });
    }
  }, [status, autoCashout, autoCashoutTriggered, handleCashout]);

  const provablyFairInfo = useMemo(() => {
    if (!status) return null;
    return {
      currentHash: status.seedHash,
      revealedSeed: status.serverSeed,
      previousRound: status.previousRound
    };
  }, [status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl bg-white/5 p-4">
        <canvas ref={canvasRef} width={600} height={300} className="w-full" />
        <div className="mt-4 flex flex-col gap-2 text-lg font-semibold md:flex-row md:items-center md:justify-between">
          <span>
            Текущий коэффициент: x{status?.multiplier?.toFixed(2) ?? "--"}
          </span>
          <span className="text-sm font-medium text-white/50">Раунд #{status?.id?.slice(0, 6) ?? "—"}</span>
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
            <button
              onClick={handleJoin}
              disabled={joining}
              className="rounded-2xl bg-accent px-4 py-3 font-semibold text-black disabled:opacity-60"
            >
              {joining ? "Подключаемся..." : "Играть"}
            </button>
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
            <button
              onClick={() => handleCashout(false)}
              disabled={!status}
              className="rounded-2xl bg-white/10 px-4 py-3 font-semibold disabled:opacity-60"
            >
              Забрать
            </button>
          </div>
          {cashoutMessage && (
            <p className="mt-3 text-xs text-white/60">{cashoutMessage}</p>
          )}
        </div>
        <div className="rounded-3xl bg-white/5 p-4">
          <h3 className="text-lg font-semibold">Provably Fair</h3>
          <p className="mt-2 text-sm text-white/60">
            Хэш текущего раунда: <span className="font-mono">{provablyFairInfo?.currentHash ?? "—"}</span>
          </p>
          {provablyFairInfo?.revealedSeed && provablyFairInfo.previousRound && (
            <div className="mt-2 space-y-1 text-xs text-white/50">
              <p>
                Seed завершившегося раунда: <span className="font-mono">{provablyFairInfo.revealedSeed}</span>
              </p>
              <p>
                Хэш (для проверки): <span className="font-mono">{provablyFairInfo.previousRound.seedHash}</span>
              </p>
              <p>Раунд завершился на x{provablyFairInfo.previousRound.multiplier.toFixed(2)}</p>
            </div>
          )}
          <p className="mt-2 text-xs text-white/50">
            После завершения раунда мы раскрываем seed и вы можете проверить его через эндпоинт
            <code className="ml-1 rounded bg-black/60 px-1">/api/provably-fair/verify</code>.
          </p>
        </div>
      </div>
      <div className="rounded-3xl bg-white/5 p-4">
        <h3 className="text-lg font-semibold">История раундов</h3>
        <ul className="mt-3 flex max-h-64 flex-col gap-3 overflow-auto text-sm text-white/70">
          {history?.map((item) => (
            <li key={item.id} className="rounded-2xl bg-black/40 p-3">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{new Date(item.createdAt).toLocaleTimeString()}</span>
                <span className="font-semibold text-accent">x{item.multiplier.toFixed(2)}</span>
              </div>
              <p className="mt-2 break-all font-mono text-xs">Hash: {item.seedHash}</p>
              <p className="break-all font-mono text-xs text-white/50">Seed: {item.seed}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
