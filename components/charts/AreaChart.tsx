"use client";

import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AreaChartProps {
  data: object[];
  areas: { key: string; name: string; color: string }[];
  xKey?: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number, name: string) => string;
  stacked?: boolean;
}

export function AreaChart({
  data,
  areas,
  xKey = "ano",
  height = 300,
  formatY,
  formatTooltip,
  stacked = false,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <defs>
          {areas.map(({ key, color }) => (
            <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "var(--color-muted)" }} />
        <YAxis tick={{ fontSize: 12, fill: "var(--color-muted)" }} tickFormatter={formatY} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={formatTooltip ? (v: unknown, n: unknown) => [formatTooltip(v as number, n as string), n as string] : undefined}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {areas.map(({ key, name, color }) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            name={name}
            stroke={color}
            fill={`url(#grad-${key})`}
            strokeWidth={2}
            stackId={stacked ? "stack" : undefined}
            isAnimationActive
            animationDuration={800}
          />
        ))}
      </ReAreaChart>
    </ResponsiveContainer>
  );
}
