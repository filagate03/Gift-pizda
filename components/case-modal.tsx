"use client";

import { Dialog } from "./dialog";
import { Case } from "../types";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

interface CaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
}

type CaseResult = {
  item: string;
  rarity: string;
  value: number;
};

export function CaseModal({ open, onOpenChange, caseData }: CaseModalProps) {
  const [result, setResult] = useState<CaseResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setResult(null);
    }
  }, [open]);

  async function handleOpenCase() {
    try {
      setLoading(true);
      const response = await fetch("/api/cases/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId: caseData.id })
      });
      const data = await response.json();
      setResult(data.result);
      if (data.result?.value && data.result.value > caseData.price) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      }
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
          animate={{ rotateY: result ? 180 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <span className="text-xl font-semibold">{result ? result.item : "Нажмите, чтобы открыть"}</span>
        </motion.div>
        <button
          onClick={handleOpenCase}
          disabled={loading}
          className="rounded-2xl bg-accent py-3 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Открываем..." : `Открыть за ${caseData.price} TON`}
        </button>
        {result && (
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-semibold">Вы выиграли: {result.item}</p>
            <p className="text-sm text-white/60">Редкость: {result.rarity}</p>
            <p className="text-sm text-white/60">Стоимость: {result.value} TON</p>
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
