import { TonConnectUI } from "@tonconnect/ui-react";

const DEFAULT_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export function createTonConnectUI() {
  const manifestUrl =
    process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST ?? `${DEFAULT_APP_URL.replace(/\/$/, "")}/api/tonconnect-manifest`;
  return new TonConnectUI({
    manifestUrl
  });
}
