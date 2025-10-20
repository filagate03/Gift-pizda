"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const navItems = [
  { href: "/", label: "Главная", icon: "🏠" },
  { href: "/cases", label: "Кейсы", icon: "🎁" },
  { href: "/crash", label: "Crash", icon: "🚀" },
  { href: "/battles", label: "Битвы", icon: "⚔️" },
  { href: "/profile", label: "Профиль", icon: "👤" }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-3xl bg-black/70 p-3 backdrop-blur">
      <ul className="flex items-center justify-between gap-2">
        {navItems.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              className={classNames(
                "flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs",
                pathname === item.href ? "bg-white/10 text-white" : "text-white/60"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
