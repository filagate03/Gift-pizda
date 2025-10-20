-- PostgreSQL schema for core entities
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id TEXT UNIQUE NOT NULL,
  username TEXT,
  balance NUMERIC(20, 8) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(20, 8) NOT NULL,
  items JSONB NOT NULL,
  probabilities JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  amount NUMERIC(20, 8) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crash_rounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  multiplier NUMERIC(10, 2) NOT NULL,
  seed TEXT NOT NULL,
  hash TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);
