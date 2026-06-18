"use client";

import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { ButterflyChart } from "@/components/charts/ButterflyChart";
import { formatNumber } from "@/lib/utils";

const populacaoHistorica = [
  { ano: "2000", populacao: 208281 },
  { ano: "2010", populacao: 240077 },
  { ano: "2015", populacao: 256201 },
  { ano: "2018", populacao: 264438 },
  { ano: "2020", populacao: 268219 },
  { ano: "2022", populacao: 272145 },
  { ano: "2024", populacao: 278023 },
];

// Pirâmide etária — dados estilizados (Censo 2022)
const piramideEtaria = [
  { faixa: "0-4", masculino: 8820, feminino: 8540 },
  { faixa: "5-9", masculino: 9140, feminino: 8870 },
  { faixa: "10-14", masculino: 9650, feminino: 9280 },
  { faixa: "15-19", masculino: 9340, feminino: 9110 },
  { faixa: "20-24", masculino: 10120, feminino: 10380 },
  { faixa: "25-29", masculino: 11240, feminino: 11580 },
  { faixa: "30-34", masculino: 11890, feminino: 12210 },
  { faixa: "35-39", masculino: 11340, feminino: 11780 },
  { faixa: "40-44", masculino: 10120, feminino: 10640 },
  { faixa: "45-49", masculino: 9230, feminino: 9780 },
  { faixa: "50-54", masculino: 8120, feminino: 8760 },
  { faixa: "55-59", masculino: 6890, feminino: 7560 },
  { faixa: "60-64", masculino: 5340, feminino: 6120 },
  { faixa: "65-69", masculino: 3920, feminino: 4780 },
  { faixa: "70+", masculino: 4800, feminino: 6840 },
];

const comparativoRMSP = [
  { municipio: "Barueri", densidade: 4720 },
  { municipio: "Osasco", densidade: 11200 },
  { municipio: "Carapicuíba", densidade: 15400 },
  { municipio: "Santana Parnaíba", densidade: 780 },
  { municipio: "Jandira", densidade: 3200 },
];

export default function PopulacaoPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="População e Demografias"
        subtitle="Evolução, pirâmide etária e densidade · Barueri/SP"
        color="var(--color-populacao)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="População 2024"
          value="278.023"
          unit="habitantes estimados"
          trend="+2,2%"
          trendDirection="up"
          trendPositive
          source="IBGE 2024"
          color="populacao"
        />
        <KpiCard
          title="Censo 2022"
          value="272.145"
          unit="habitantes recenseados"
          source="IBGE Censo 2022"
          color="populacao"
        />
        <KpiCard
          title="Densidade Demográfica"
          value="4.720"
          unit="hab/km² (2022)"
          source="IBGE 2022"
          color="populacao"
        />
        <KpiCard
          title="Área Territorial"
          value="66,4 km²"
          unit="área total do município"
          source="IBGE"
          color="populacao"
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Evolução Populacional</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">Censo e estimativas IBGE · 2000–2024</p>
        <AreaChart
          data={populacaoHistorica}
          areas={[{ key: "populacao", name: "População", color: "var(--color-populacao)" }]}
          formatY={(v) => `${(v / 1000).toFixed(0)}k`}
          formatTooltip={(v) => `${formatNumber(v)} hab.`}
          height={280}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Pirâmide Etária</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Distribuição por sexo e faixa etária · Censo IBGE 2022
          </p>
          <ButterflyChart data={piramideEtaria} height={520} />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">
            Densidade Demográfica — RMSP
          </h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Habitantes por km² · Municípios vizinhos · 2022
          </p>
          <BarChart
            data={comparativoRMSP}
            bars={[{ key: "densidade", name: "hab/km²", color: "var(--color-populacao)" }]}
            xKey="municipio"
            height={300}
            formatY={(v) => `${v.toLocaleString("pt-BR")}`}
            formatTooltip={(v) => `${formatNumber(v)} hab/km²`}
          />

          <div className="mt-4 p-3 bg-[var(--color-bg)] rounded-lg">
            <p className="text-xs text-[var(--color-muted)]">
              Barueri tem densidade intermediária entre os municípios da RMSP — com amplas áreas
              industriais e de serviços que diluem a densidade residencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
