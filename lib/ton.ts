import { TonConnectUI } from "@tonconnect/ui-react";

export function createTonConnectUI() {
  return new TonConnectUI({
    manifestUrl: process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST || ""
  });
}
