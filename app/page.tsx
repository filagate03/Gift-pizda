import { Header } from "../components/header";
import { BottomNav } from "../components/bottom-nav";
import Link from "next/link";
import { CaseCard } from "../components/case-card";
import { featuredCases } from "../lib/data";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <Header />
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Быстрые действия</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-medium">
            <Link className="rounded-2xl bg-accent py-3 text-center text-black" href="/deposit">
              Пополнить
            </Link>
            <Link className="rounded-2xl bg-white/10 py-3 text-center" href="/withdraw">
              Вывести
            </Link>
          </div>
        </section>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Популярные кейсы</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {featuredCases.map((item) => (
              <CaseCard key={item.id} caseData={item} />
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Последние выигрыши</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/60">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index} className="flex justify-between">
                <span>User***{Math.floor(Math.random() * 900 + 100)}</span>
                <span>выиграл {Math.floor(Math.random() * 90 + 10)} TON</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
