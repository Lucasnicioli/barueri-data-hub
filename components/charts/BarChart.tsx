"use client";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: object[];
  bars: { key: string; name: string; color: string }[];
  xKey?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  formatY?: (v: number) => string;
  formatTooltip?: (v: number, name: string) => string;
}

export function BarChart({
  data,
  bars,
  xKey = "ano",
  height = 300,
  layout = "horizontal",
  formatY,
  formatTooltip,
}: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={isVertical ? "vertical" : "horizontal"}
        margin={{ top: 5, right: 20, left: isVertical ? 120 : 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        {isVertical ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12, fill: "var(--color-muted)" }} tickFormatter={formatY} />
            <YAxis type="category" dataKey={xKey} tick={{ fontSize: 12, fill: "var(--color-muted)" }} width={110} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "var(--color-muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--color-muted)" }} tickFormatter={formatY} />
          </>
        )}
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
        {bars.map(({ key, name, color }) => (
          <Bar
            key={key}
            dataKey={key}
            name={name}
            fill={color}
            radius={[4, 4, 0, 0]}
            isAnimationActive
            animationDuration={800}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
}
