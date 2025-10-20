"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Case } from "../types";
import { CaseModal } from "./case-modal";

interface CaseCardProps {
  caseData: Case;
}

export function CaseCard({ caseData }: CaseCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="flex h-full flex-col gap-3 rounded-3xl bg-white/5 p-4 text-left"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary">
          {caseData.image && (
            <Image src={caseData.image} alt={caseData.name} fill className="object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{caseData.name}</h3>
          <p className="text-sm text-white/60">{caseData.description}</p>
          <p className="text-sm font-medium text-accent">Цена: {caseData.price} TON</p>
        </div>
      </motion.button>
      <CaseModal open={open} onOpenChange={setOpen} caseData={caseData} />
    </>
  );
}
