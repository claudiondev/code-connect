"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AuthTab {
  href: string;
  label: string;
}

const TABS: AuthTab[] = [
  { href: "/login", label: "entrar" },
  { href: "/cadastro", label: "cadastrar" },
];

export function AuthTabs() {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      className="grid grid-cols-2 gap-1 rounded-lg bg-ink-800 p-1 font-mono text-sm"
    >
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={[
              "rounded-md py-2 text-center transition-colors",
              isActive
                ? "bg-accent font-semibold text-ink-950"
                : "text-muted hover:text-white",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
