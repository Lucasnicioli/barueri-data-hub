"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: object[];
  lines: { key: string; name: string; color: string }[];
  xKey?: string;
  height?: number;
  formatY?: (v: number) => string;
  formatTooltip?: (v: number, name: string) => string;
}

export function LineChart({
  data,
  lines,
  xKey = "ano",
  height = 300,
  formatY,
  formatTooltip,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: "var(--color-muted)" }}
          axisLine={{ stroke: "var(--color-border)" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--color-muted)" }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickFormatter={formatY}
        />
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
        {lines.map(({ key, name, color }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            name={name}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 6 }}
            isAnimationActive
            animationDuration={800}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
}
