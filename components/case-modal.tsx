"use client";

import { Dialog } from "./dialog";
import { Case } from "../types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
}

type CaseOpenResponse = {
  result: {
    item: string;
    rarity: string;
    value: number;
    probability: number;
  };
  serverSeed: string;
  clientSeed: string;
  signature: string;
  roll: number;
};

export function CaseModal({ open, onOpenChange, caseData }: CaseModalProps) {
  const [caseResult, setCaseResult] = useState<CaseOpenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setCaseResult(null);
      setError(null);
    }
  }, [open]);

  async function handleOpenCase() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/cases/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId: caseData.id })
      });
      if (!response.ok) {
        throw new Error("Failed to open case");
      }
      const data: CaseOpenResponse = await response.json();
      setCaseResult(data);
      if (data.result?.value && data.result.value > caseData.price) {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error(err);
      setError("Не удалось открыть кейс. Попробуйте еще раз позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{caseData.name}</h2>
        <p className="text-sm text-white/60">{caseData.description}</p>
        <motion.div
          className="relative flex h-40 items-center justify-center rounded-2xl bg-white/5"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: caseResult ? 180 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <span className="px-4 text-center text-xl font-semibold">
            {caseResult ? caseResult.result.item : "Нажмите, чтобы открыть"}
          </span>
        </motion.div>
        <button
          onClick={handleOpenCase}
          disabled={loading}
          className="rounded-2xl bg-accent py-3 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Открываем..." : `Открыть за ${caseData.price} TON`}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {caseResult && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-semibold">Вы выиграли: {caseResult.result.item}</p>
              <p className="text-sm text-white/60">Редкость: {caseResult.result.rarity}</p>
              <p className="text-sm text-white/60">Стоимость: {caseResult.result.value} TON</p>
              <p className="text-sm text-white/60">
                Вероятность: {(caseResult.result.probability * 100).toFixed(2)}%
              </p>
            </div>
            <div className="rounded-2xl bg-black/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Проверьте честность
              </h3>
              <dl className="mt-2 grid gap-2 text-xs text-white/60">
                <div>
                  <dt className="font-medium text-white/70">Server seed</dt>
                  <dd className="break-all font-mono">{caseResult.serverSeed}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white/70">Client seed</dt>
                  <dd className="font-mono">{caseResult.clientSeed}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white/70">SHA256 hash</dt>
                  <dd className="break-all font-mono">{caseResult.signature}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white/70">Roll</dt>
                  <dd className="font-mono">{caseResult.roll.toFixed(6)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-white/50">
                Используйте серверный и клиентский seed, чтобы проверить подпись через эндпоинт
                <code className="ml-1 rounded bg-white/10 px-1">/api/provably-fair/verify</code> или в
                любом SHA256 калькуляторе.
              </p>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">Вероятности</h3>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-white/70">
            {caseData.items.map((item) => (
              <li key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span>{(item.probability * 100).toFixed(2)}% — {item.value} TON</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
}
