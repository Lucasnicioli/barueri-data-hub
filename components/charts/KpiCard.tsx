"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { KpiCardProps } from "@/types";

const colorMap = {
  saude: "var(--color-saude)",
  economia: "var(--color-economia)",
  educacao: "var(--color-educacao)",
  populacao: "var(--color-populacao)",
  primary: "var(--color-primary)",
};

export function KpiCard({
  title,
  value,
  unit,
  trend,
  trendDirection = "neutral",
  trendPositive,
  source,
  color = "primary",
  loading = false,
}: KpiCardProps) {
  const accentColor = colorMap[color];
  const isPositive = trendPositive ?? trendDirection === "up";

  if (loading) {
    return (
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 hover:shadow-md transition-shadow"
      style={{ borderTopColor: accentColor, borderTopWidth: 3 }}
    >
      <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-wide mb-2">
        {title}
      </p>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="font-mono-data text-3xl font-bold text-[var(--color-text)]">{value}</p>
          {unit && <p className="text-xs text-[var(--color-muted)] mt-0.5">{unit}</p>}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
              isPositive
                ? "bg-green-50 text-green-600"
                : trendDirection === "neutral"
                ? "bg-gray-50 text-gray-500"
                : "bg-red-50 text-red-500"
            }`}
          >
            {trendDirection === "up" ? (
              <TrendingUp size={13} />
            ) : trendDirection === "down" ? (
              <TrendingDown size={13} />
            ) : (
              <Minus size={13} />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {source && (
        <p className="text-[10px] text-[var(--color-muted)] mt-3 pt-3 border-t border-[var(--color-border)]">
          Fonte: {source}
        </p>
      )}
    </div>
  );
}
