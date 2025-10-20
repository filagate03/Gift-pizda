import { BottomNav } from "../../components/bottom-nav";
import { CrashGame } from "../../components/crash-game";

export default function CrashPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Crash</h1>
          <p className="text-sm text-white/60">
            Проверьте свою стратегию с Provably Fair алгоритмом.
          </p>
        </header>
        <CrashGame />
      </main>
      <BottomNav />
    </>
  );
}
