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
  roll: number;
};

type ProvablyFairVerification = {
  hash: string;
  seed: string;
  clientSeed: string | null;
  computedHash: string;
  verified: boolean;
};

type CrashRoundState = {
  id: string;
  seed: string;
  hash: string;
  multiplier: number;
  targetMultiplier: number;
  lastUpdated: number;
};

type CrashHistoryEntry = {
  id: string;
  multiplier: number;
  seed: string;
  seedHash: string;
  createdAt: string;
};

const CRASH_MAX_HISTORY = 50;
const FALLBACK_USD_RATE = 2.1;

function createCrashRound(): CrashRoundState {
  const seed = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(seed).digest("hex");
  const targetMultiplier = Number((1.2 + Math.random() * 9).toFixed(2));

  return {
    id: crypto.randomUUID(),
    seed,
    hash,
    multiplier: 1,
    targetMultiplier,
    lastUpdated: Date.now()
  };
}

function bootstrapCrashHistory(): CrashHistoryEntry[] {
  const now = Date.now();
  return Array.from({ length: 10 }).map((_, index) => {
    const seed = crypto.randomBytes(32).toString("hex");
    const seedHash = crypto.createHash("sha256").update(seed).digest("hex");
    return {
      id: crypto.randomUUID(),
      multiplier: Number((1.2 + Math.random() * 8.5).toFixed(2)),
      seed,
      seedHash,
      createdAt: new Date(now - index * 60000).toISOString()
    };
  });
}

let currentCrashRound: CrashRoundState = createCrashRound();
let previousCrashRound: CrashHistoryEntry | null = null;
let crashHistory: CrashHistoryEntry[] = bootstrapCrashHistory();
if (crashHistory.length > 0) {
  previousCrashRound = crashHistory[0];
}

function advanceCrashRound() {
  const now = Date.now();
  const elapsedSeconds = Math.max(0, (now - currentCrashRound.lastUpdated) / 1000);
  if (elapsedSeconds === 0) {
    return;
  }

  const growth = elapsedSeconds * (0.35 + Math.random() * 0.45);
  currentCrashRound.multiplier = Number(
    Math.min(currentCrashRound.multiplier + growth, currentCrashRound.targetMultiplier).toFixed(2)
  );
  currentCrashRound.lastUpdated = now;

  if (currentCrashRound.multiplier >= currentCrashRound.targetMultiplier) {
    finalizeCurrentCrashRound();
  }
}

function finalizeCurrentCrashRound() {
  const finishedRound: CrashHistoryEntry = {
    id: currentCrashRound.id,
    multiplier: currentCrashRound.targetMultiplier,
    seed: currentCrashRound.seed,
    seedHash: currentCrashRound.hash,
    createdAt: new Date().toISOString()
  };

  previousCrashRound = finishedRound;
  crashHistory = [finishedRound, ...crashHistory].slice(0, CRASH_MAX_HISTORY);
  currentCrashRound = createCrashRound();
}

export async function getUserBalance(telegramId: string): Promise<BalanceResponse> {
  const balance = telegramId ? 125.37 : 0;
  const usd = Number((balance * FALLBACK_USD_RATE).toFixed(2));
  return { balance, usd };
}

export async function openCase(caseId: string): Promise<CaseOpenResponse> {
  const caseData = featuredCases.find((item) => item.id === caseId);
  if (!caseData) {
    throw new Error("Case not found");
  }

  const serverSeed = crypto.randomBytes(32).toString("hex");
  const clientSeed = String(Date.now());
  const signature = crypto.createHash("sha256").update(`${serverSeed}:${clientSeed}`).digest("hex");
  const roll = parseInt(signature.slice(0, 16), 16) / 0xffffffffffffffff;

  let cumulative = 0;
  const selected =
    caseData.items.find((item) => {
      cumulative += item.probability;
      return roll <= cumulative;
    }) ?? caseData.items[caseData.items.length - 1];

  return {
    result: {
      item: selected.name,
      rarity: selected.rarity,
      value: selected.value,
      probability: selected.probability
    },
    serverSeed,
    clientSeed,
    signature,
    roll
  };
}

export async function getCrashStatus() {
  advanceCrashRound();

  return {
    id: currentCrashRound.id,
    multiplier: currentCrashRound.multiplier,
    seedHash: currentCrashRound.hash,
    active: true,
    serverSeed: previousCrashRound?.seed ?? null,
    previousRound: previousCrashRound
      ? {
          id: previousCrashRound.id,
          multiplier: previousCrashRound.multiplier,
          seedHash: previousCrashRound.seedHash,
          createdAt: previousCrashRound.createdAt
        }
      : null
  };
}

export async function joinCrashRound(bet = 0) {
  return {
    success: true,
    roundId: currentCrashRound.id,
    bet
  };
}

export async function crashCashout(bet = 0) {
  const multiplier = previousCrashRound?.multiplier ?? currentCrashRound.multiplier;
  return {
    success: true,
    roundId: previousCrashRound?.id ?? currentCrashRound.id,
    multiplier,
    winnings: Number((bet * multiplier).toFixed(2))
  };
}

export async function getCrashHistory() {
  return crashHistory;
}

export async function verifyProvablyFair(
  seed: string,
  hash: string,
  clientSeed?: string
): Promise<ProvablyFairVerification> {
  const payload = clientSeed ? `${seed}:${clientSeed}` : seed;
  const computedHash = crypto.createHash("sha256").update(payload).digest("hex");
  return {
    hash,
    seed,
    clientSeed: clientSeed ?? null,
    computedHash,
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
