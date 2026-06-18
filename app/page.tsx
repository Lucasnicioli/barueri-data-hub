"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { BarChart } from "@/components/charts/BarChart";
import { formatCompact } from "@/lib/utils";

const BarueriMap = dynamic(() => import("@/components/maps/BarueriMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] rounded-xl bg-[var(--color-bg)] animate-pulse flex items-center justify-center">
      <p className="text-[var(--color-muted)] text-sm">Carregando mapa…</p>
    </div>
  ),
});

const populacaoHistorica = [
  { ano: "2010", populacao: 240077 },
  { ano: "2015", populacao: 256201 },
  { ano: "2018", populacao: 264438 },
  { ano: "2020", populacao: 268219 },
  { ano: "2022", populacao: 272145 },
  { ano: "2024", populacao: 278023 },
];

const composicaoPib = [
  { name: "Serviços", value: 62 },
  { name: "Indústria", value: 35 },
  { name: "Agropecuária", value: 3 },
];

const receitaDespesa = [
  { ano: "2019", receita: 1.82, despesa: 1.75 },
  { ano: "2020", receita: 1.89, despesa: 1.92 },
  { ano: "2021", receita: 2.10, despesa: 1.98 },
  { ano: "2022", receita: 2.35, despesa: 2.21 },
  { ano: "2023", receita: 2.58, despesa: 2.42 },
  { ano: "2024", receita: 2.75, despesa: 2.60 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="Barueri — Visão Geral"
        subtitle="Indicadores municipais consolidados · Dados públicos IBGE, DATASUS e Siconfi"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="População Estimada"
          value="278.023"
          unit="habitantes (2024)"
          trend="+1,4%"
          trendDirection="up"
          trendPositive
          source="IBGE 2024"
          color="populacao"
        />
        <KpiCard
          title="PIB per Capita"
          value="R$ 108 mil"
          unit="por habitante/ano"
          trend="+5,2%"
          trendDirection="up"
          trendPositive
          source="IBGE 2022"
          color="economia"
        />
        <KpiCard
          title="IDHM"
          value="0,786"
          unit="Índice de Desenvolvimento Humano"
          trend="+0,8%"
          trendDirection="up"
          trendPositive
          source="PNUD 2021"
          color="educacao"
        />
        <KpiCard
          title="Mortalidade Infantil"
          value="5,88"
          unit="por mil nascidos vivos"
          trend="-12%"
          trendDirection="down"
          trendPositive
          source="DATASUS 2023"
          color="saude"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Evolução Populacional</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">Censo e estimativas IBGE · 2010–2024</p>
          <LineChart
            data={populacaoHistorica}
            lines={[{ key: "populacao", name: "População", color: "var(--color-populacao)" }]}
            formatY={(v) => formatCompact(v)}
            formatTooltip={(v) => `${formatCompact(v)} hab.`}
          />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Composição do PIB</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">Por setor econômico · IBGE</p>
          <PieChart
            data={composicaoPib}
            colors={["var(--color-economia)", "var(--color-saude)", "var(--color-accent)"]}
            innerRadius={60}
            formatTooltip={(v) => `${v}%`}
          />
        </div>
      </div>

      {/* Mapa interativo de regiões */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Distribuição Regional — Barueri</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Densidade demográfica por região · hab/km² · Censo IBGE 2022
        </p>
        <BarueriMap metric="densidade" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Receita vs Despesa Municipal</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">Em bilhões de reais · Siconfi/STN · 2019–2024</p>
        <BarChart
          data={receitaDespesa}
          bars={[
            { key: "receita", name: "Receita Realizada", color: "var(--color-accent)" },
            { key: "despesa", name: "Despesa Empenhada", color: "var(--color-economia)" },
          ]}
          formatY={(v) => `R$ ${v}B`}
          formatTooltip={(v) => `R$ ${v} bilhões`}
          height={320}
        />
      </div>
    </div>
  );
}
