import { BottomNav } from "../../components/bottom-nav";

const modes = [
  {
    title: "1v1",
    description: "Два игрока, один победитель. Победитель забирает банк.",
    commission: 5
  },
  {
    title: "2v2",
    description: "Командные бои с синхронным открытием кейсов.",
    commission: 5
  },
  {
    title: "Турниры",
    description: "Состязания на выбывание с призовым фондом TON.",
    commission: 5
  }
];

export default function BattlesPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Battles</h1>
          <p className="text-sm text-white/60">
            PvP режим с прозрачной механикой и одинаковыми шансами для всех.
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {modes.map((mode) => (
            <div key={mode.title} className="flex flex-col gap-2 rounded-3xl bg-white/5 p-4">
              <h3 className="text-xl font-semibold">{mode.title}</h3>
              <p className="text-sm text-white/60">{mode.description}</p>
              <p className="text-sm text-white/50">Комиссия платформы: {mode.commission}%</p>
              <button className="mt-auto rounded-2xl bg-accent py-2 font-semibold text-black">
                Создать лобби
              </button>
            </div>
          ))}
        </section>
      </main>
      <BottomNav />
    </>
  );
}
