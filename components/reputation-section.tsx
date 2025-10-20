export function ReputationSection() {
  return (
    <section className="rounded-3xl bg-white/5 p-4">
      <h2 className="text-xl font-semibold">Доверие и репутация</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="rounded-3xl bg-black/50 p-4">
          <h3 className="text-lg font-semibold">Команда</h3>
          <p className="mt-2 text-sm text-white/60">
            Публичные профили разработчиков с LinkedIn и подтвержденной экспертизой в TON.
          </p>
        </div>
        <div className="rounded-3xl bg-black/50 p-4">
          <h3 className="text-lg font-semibold">Аудит</h3>
          <p className="mt-2 text-sm text-white/60">
            Смарт-контракты прошли аудит известными компаниями, результаты опубликованы в GitHub.
          </p>
        </div>
        <div className="rounded-3xl bg-black/50 p-4">
          <h3 className="text-lg font-semibold">Финансы</h3>
          <p className="mt-2 text-sm text-white/60">
            Прозрачный дашборд по средствам платформы, выплаченным призам и резервам.
          </p>
        </div>
      </div>
    </section>
  );
}
