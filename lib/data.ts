import { Case } from "../types";

export const featuredCases: Case[] = [
  {
    id: "starter",
    name: "Starter Case",
    description: "Идеально для новичков",
    price: 2,
    image: "/images/cases/starter.svg",
    items: [
      { name: "Базовый NFT", value: 1, probability: 0.5, rarity: "Common" },
      { name: "Эксклюзивный стикер", value: 3, probability: 0.3, rarity: "Rare" },
      { name: "Редкий подарок", value: 5, probability: 0.15, rarity: "Epic" },
      { name: "Легендарный NFT", value: 10, probability: 0.05, rarity: "Legendary" }
    ]
  },
  {
    id: "premium",
    name: "Premium Case",
    description: "Для охотников за топовыми призами",
    price: 8,
    image: "/images/cases/premium.svg",
    items: [
      { name: "Премиум NFT", value: 6, probability: 0.45, rarity: "Rare" },
      { name: "Фан-токены", value: 10, probability: 0.3, rarity: "Epic" },
      { name: "NFT персонаж", value: 20, probability: 0.2, rarity: "Legendary" },
      { name: "Уникальный артефакт", value: 40, probability: 0.05, rarity: "Mythic" }
    ]
  },
  {
    id: "collectors",
    name: "Collectors Case",
    description: "Для коллекционеров редкостей",
    price: 15,
    image: "/images/cases/collectors.svg",
    items: [
      { name: "Коллекционный NFT", value: 12, probability: 0.5, rarity: "Rare" },
      { name: "Анимированный подарок", value: 25, probability: 0.3, rarity: "Epic" },
      { name: "Эксклюзивный аватар", value: 50, probability: 0.15, rarity: "Legendary" },
      { name: "1/1 NFT", value: 120, probability: 0.05, rarity: "Mythic" }
    ]
  }
];
