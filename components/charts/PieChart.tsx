"use client";

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
  colors: string[];
  height?: number;
  formatTooltip?: (v: number) => string;
  innerRadius?: number;
}

export function PieChart({
  data,
  colors,
  height = 300,
  formatTooltip,
  innerRadius = 0,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive
          animationDuration={800}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={formatTooltip ? (v: unknown) => [formatTooltip(v as number), ""] : undefined}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </RePieChart>
    </ResponsiveContainer>
  );
}
