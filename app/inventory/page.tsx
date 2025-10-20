import { BottomNav } from "../../components/bottom-nav";

const items = [
  {
    id: "nft-1",
    name: "Legendary Gift",
    rarity: "Legendary",
    price: 48,
    acquiredAt: "2024-01-12"
  },
  {
    id: "nft-2",
    name: "Epic Avatar",
    rarity: "Epic",
    price: 22,
    acquiredAt: "2024-01-18"
  }
];

export default function InventoryPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Инвентарь</h1>
          <p className="text-sm text-white/60">
            Управляйте своими NFT и подарками, отслеживайте историю и рыночную цену.
          </p>
        </header>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Ваши предметы</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-3xl bg-black/50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase">
                    {item.rarity}
                  </span>
                </div>
                <p className="text-sm text-white/60">Получен: {item.acquiredAt}</p>
                <p className="text-sm text-white/60">Рыночная цена: {item.price} TON</p>
                <div className="mt-3 flex gap-3">
                  <button className="flex-1 rounded-2xl bg-accent py-2 font-semibold text-black">
                    Продать
                  </button>
                  <button className="flex-1 rounded-2xl bg-white/10 py-2 font-semibold">
                    Апгрейд
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
