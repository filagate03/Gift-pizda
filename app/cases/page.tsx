import { BottomNav } from "../../components/bottom-nav";
import { CaseCard } from "../../components/case-card";
import { featuredCases } from "../../lib/data";

export default function CasesPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Кейсы</h1>
          <p className="text-sm text-white/60">
            Прозрачные вероятности и полная история выпадений.
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {featuredCases.map((item) => (
            <CaseCard key={item.id} caseData={item} />
          ))}
        </section>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Проверка честности</h2>
          <p className="mt-2 text-sm text-white/60">
            Каждое открытие кейса генерируется на основе публичного алгоритма с seed + timestamp.
            Вы можете проверить любой результат через API аудит.
          </p>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
