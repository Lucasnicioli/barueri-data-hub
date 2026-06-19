"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  TrendingUp,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

const navItems = [
  { href: "/",        label: "Dashboard",  icon: LayoutDashboard, color: "text-[var(--color-accent)]" },
  { href: "/saude",   label: "Saúde",      icon: Heart,           color: "text-[var(--color-saude)]" },
  { href: "/economia",label: "Economia",   icon: TrendingUp,      color: "text-[var(--color-economia)]" },
  { href: "/educacao",label: "Educação",   icon: GraduationCap,   color: "text-[var(--color-educacao)]" },
  { href: "/populacao",label: "População", icon: Users,           color: "text-[var(--color-populacao)]" },
  { href: "/fontes",  label: "Fontes",     icon: BookOpen,        color: "text-white/60" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--color-primary)] text-white flex flex-col z-40">
      <div className="px-5 py-5 border-b border-white/10 space-y-3">
        {/* Logo Prefeitura de Barueri */}
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/barueri.png"
            alt="Prefeitura de Barueri"
            className="h-10 object-contain"
          />
        </div>

        {/* Logos ICTUS + NIB */}
        <div className="flex items-center justify-center gap-4 bg-white/10 rounded-xl px-3 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/ictus.png"
            alt="ICTUS Diagnósticos"
            className="h-14 object-contain brightness-0 invert"
          />
          <div className="w-px h-10 bg-white/30" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/nib.png"
            alt="NIB — Núcleo de Inteligência em Saúde Barueri"
            className="h-14 object-contain brightness-0 invert"
          />
        </div>

        <p className="text-white/40 text-[10px] text-center tracking-wide">
          Barueri Data Hub
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, color }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} className={active ? "text-[var(--color-accent)]" : color} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-white/30 text-[10px] text-center">
          Dados públicos • IBGE / DATASUS
        </p>
      </div>
    </aside>
  );
}
