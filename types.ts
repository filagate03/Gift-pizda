export type CaseItem = {
  name: string;
  value: number;
  probability: number;
  rarity: string;
};

export type Case = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  items: CaseItem[];
};

export type CrashRound = {
  id: string;
  multiplier: number;
  seed: string;
  hash: string;
  timestamp: string;
};

export type User = {
  id: string;
  telegram_id: string;
  username: string;
  balance: number;
  created_at: string;
};
