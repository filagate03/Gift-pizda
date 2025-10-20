import crypto from "crypto";
import { featuredCases } from "./data";

type BalanceResponse = {
  balance: number;
  usd: number;
};

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
};

type ProvablyFairVerification = {
  hash: string;
  seed: string;
  verified: boolean;
};

let crashMultiplier = 1;
let crashActive = true;
let crashSeed = crypto.randomBytes(32).toString("hex");
const crashHash = crypto.createHash("sha256").update(crashSeed).digest("hex");
let crashHistory = Array.from({ length: 10 }).map((_, index) => ({
  id: `round-${index}`,
  multiplier: Number((Math.random() * 10 + 1).toFixed(2)),
  seedHash: crypto.randomBytes(16).toString("hex"),
  createdAt: new Date(Date.now() - index * 60000).toISOString()
}));

export async function getUserBalance(telegramId: string): Promise<BalanceResponse> {
  const balance = 125.37;
  const usd = balance * 2.1;
  return { balance, usd };
}

export async function openCase(caseId: string): Promise<CaseOpenResponse> {
  const caseData = featuredCases.find((item) => item.id === caseId);
  if (!caseData) {
    throw new Error("Case not found");
  }

  const seed = crypto.randomBytes(32).toString("hex");
  const timestamp = Date.now();
  const combined = `${seed}:${timestamp}`;
  const hash = crypto.createHash("sha256").update(combined).digest("hex");
  const random = Number(`0.${hash.slice(0, 12)}`);

  let cumulative = 0;
  const selected = caseData.items.find((item) => {
    cumulative += item.probability;
    return random <= cumulative;
  }) ?? caseData.items[caseData.items.length - 1];

  return {
    result: {
      item: selected.name,
      rarity: selected.rarity,
      value: selected.value,
      probability: selected.probability
    },
    serverSeed: seed,
    clientSeed: String(timestamp),
    signature: hash
  };
}

export async function getCrashStatus() {
  crashMultiplier = crashActive ? crashMultiplier + 0.03 : 1;
  if (crashMultiplier > 10) {
    crashActive = false;
  }
  if (!crashActive) {
    crashHistory = [
      {
        id: crypto.randomUUID(),
        multiplier: Number(crashMultiplier.toFixed(2)),
        seedHash: crashHash,
        createdAt: new Date().toISOString()
      },
      ...crashHistory.slice(0, 49)
    ];
    crashSeed = crypto.randomBytes(32).toString("hex");
    crashMultiplier = 1;
    crashActive = true;
  }

  return {
    multiplier: crashMultiplier,
    seedHash: crashHash,
    serverSeed: crashActive ? undefined : crashSeed,
    active: crashActive
  };
}

export async function joinCrashRound() {
  return { success: true };
}

export async function crashCashout() {
  return { success: true, multiplier: crashMultiplier };
}

export async function getCrashHistory() {
  return crashHistory;
}

export async function verifyProvablyFair(seed: string, hash: string): Promise<ProvablyFairVerification> {
  const computedHash = crypto.createHash("sha256").update(seed).digest("hex");
  return {
    hash,
    seed,
    verified: computedHash === hash
  };
}

export async function getReferralStats() {
  return {
    code: "GIFT123",
    url: `https://t.me/yourappbot/app?start=GIFT123`,
    levels: [
      { level: 1, count: 24, rewardRate: 10, volume: 420 },
      { level: 2, count: 12, rewardRate: 5, volume: 180 },
      { level: 3, count: 6, rewardRate: 2, volume: 75 }
    ],
    bonusPercent: 3
  };
}
