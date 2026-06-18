"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { formatNumber } from "@/lib/utils";

interface FaixaEtaria {
  faixa: string;
  masculino: number;
  feminino: number;
}

interface Props {
  data: FaixaEtaria[];
  height?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const masc = Math.abs(payload.find((p: { dataKey: string }) => p.dataKey === "masculinoNeg")?.value ?? 0);
  const fem = payload.find((p: { dataKey: string }) => p.dataKey === "feminino")?.value ?? 0;
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-[var(--color-text)] mb-1">Faixa {label} anos</p>
      <p style={{ color: "var(--color-saude)" }}>♂ Masculino: {formatNumber(masc)}</p>
      <p style={{ color: "var(--color-populacao)" }}>♀ Feminino: {formatNumber(fem)}</p>
      <p className="text-[var(--color-muted)] text-xs mt-1">Total: {formatNumber(masc + fem)}</p>
    </div>
  );
};

export function ButterflyChart({ data, height = 520 }: Props) {
  // Masculino como valor negativo para ir para a esquerda
  const transformed = data.map((d) => ({
    ...d,
    masculinoNeg: -d.masculino,
  }));

  const maxVal = Math.max(...data.map((d) => Math.max(d.masculino, d.feminino)));
  const domainMax = Math.ceil(maxVal / 1000) * 1000 + 1000;

  const formatTick = (v: number) => {
    const abs = Math.abs(v);
    return abs === 0 ? "0" : `${(abs / 1000).toFixed(0)}k`;
  };

  return (
    <div>
      {/* Cabeçalho com os sexos */}
      <div className="flex justify-between text-xs font-semibold mb-1 px-8">
        <span style={{ color: "var(--color-saude)" }}>← Masculino</span>
        <span style={{ color: "var(--color-populacao)" }}>Feminino →</span>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={transformed}
          layout="vertical"
          margin={{ top: 0, right: 48, left: 48, bottom: 0 }}
          barCategoryGap="20%"
        >
          <XAxis
            type="number"
            domain={[-domainMax, domainMax]}
            tickFormatter={formatTick}
            tick={{ fontSize: 11, fill: "var(--color-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="faixa"
            tick={{ fontSize: 11, fill: "var(--color-text)", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) =>
              value === "masculinoNeg" ? "Masculino" : "Feminino"
            }
            wrapperStyle={{ fontSize: 12 }}
          />

          {/* Barra masculino (negativa → esquerda) */}
          <Bar dataKey="masculinoNeg" name="masculinoNeg" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={800}>
            {transformed.map((_, i) => (
              <Cell key={i} fill="var(--color-saude)" fillOpacity={0.8} />
            ))}
            <LabelList
              dataKey="masculinoNeg"
              position="left"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) => `${(Math.abs(Number(v)) / 1000).toFixed(1)}k`}
              style={{ fontSize: 10, fill: "var(--color-saude)" }}
            />
          </Bar>

          {/* Barra feminino (positiva → direita) */}
          <Bar dataKey="feminino" name="feminino" radius={[4, 0, 0, 4]} isAnimationActive animationDuration={800}>
            {transformed.map((_, i) => (
              <Cell key={i} fill="var(--color-populacao)" fillOpacity={0.8} />
            ))}
            <LabelList
              dataKey="feminino"
              position="right"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) => `${(Number(v) / 1000).toFixed(1)}k`}
              style={{ fontSize: 10, fill: "var(--color-populacao)" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
