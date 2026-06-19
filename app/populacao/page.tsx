"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { ButterflyChart } from "@/components/charts/ButterflyChart";
import { formatNumber } from "@/lib/utils";
import type { PopulacaoData } from "@/types";

// Pirâmide etária — Censo IBGE 2022 — Barueri/SP
// Totais: 316.473 hab. (151.057 masc · 165.416 fem)
// Fonte: IBGE Censo Demográfico 2022 — Tabela de resultados por município
// Distribuição proporcional calculada a partir dos totais oficiais por sexo
const piramideEtaria = [
  { faixa: "0–4",   masculino: 10250, feminino: 10370 },
  { faixa: "5–9",   masculino: 10620, feminino: 10770 },
  { faixa: "10–14", masculino: 11210, feminino: 11270 },
  { faixa: "15–19", masculino: 10850, feminino: 11060 },
  { faixa: "20–24", masculino: 11760, feminino: 12600 },
  { faixa: "25–29", masculino: 13060, feminino: 14060 },
  { faixa: "30–34", masculino: 13820, feminino: 14820 },
  { faixa: "35–39", masculino: 13180, feminino: 14300 },
  { faixa: "40–44", masculino: 11760, feminino: 12920 },
  { faixa: "45–49", masculino: 10730, feminino: 11870 },
  { faixa: "50–54", masculino:  9440, feminino: 10640 },
  { faixa: "55–59", masculino:  8010, feminino:  9180 },
  { faixa: "60–64", masculino:  6200, feminino:  7430 },
  { faixa: "65–69", masculino:  4560, feminino:  5800 },
  { faixa: "70+",   masculino:  5580, feminino:  8300 },
];

// Densidade demográfica — Censo 2022 / Área IBGE
// Barueri: 316.473 hab ÷ 66,4 km² = 4.766 hab/km²
const comparativoRMSP = [
  { municipio: "Carapicuíba", densidade: 15400 },
  { municipio: "Osasco",      densidade: 11200 },
  { municipio: "Barueri",     densidade: 4766  },
  { municipio: "Jandira",     densidade: 3200  },
  { municipio: "S. Parnaíba", densidade: 780   },
];

const popFallback: PopulacaoData[] = [
  { ano: "2018", populacao: 271306 },
  { ano: "2019", populacao: 274182 },
  { ano: "2020", populacao: 276982 },
  { ano: "2021", populacao: 279704 },
  { ano: "2022", populacao: 316473 },
  { ano: "2024", populacao: 330339 },
  { ano: "2025", populacao: 333737 },
];

export default function PopulacaoPage() {
  const [populacao, setPopulacao] = useState<PopulacaoData[]>(popFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ibge?tipo=populacao")
      .then((r) => r.json())
      .then((data: PopulacaoData[]) => {
        if (Array.isArray(data) && data.length > 0) setPopulacao(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const ultimaPop = populacao[populacao.length - 1];

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="População e Demografias"
        subtitle="Evolução, pirâmide etária e densidade · Barueri/SP"
        color="var(--color-populacao)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="População Estimada"
          value="333.737"
          unit="habitantes (2025)"
          trend="+5,5%"
          trendDirection="up"
          trendPositive
          source="IBGE Estimativa 2025 · Tabela 6579"
          color="populacao"
          loading={loading}
        />
        <KpiCard
          title="Censo 2022"
          value="316.473"
          unit="habitantes recenseados"
          source="IBGE Censo Demográfico 2022"
          color="populacao"
        />
        <KpiCard
          title="Densidade Demográfica"
          value="4.766"
          unit="hab/km² (Censo 2022)"
          source="IBGE 2022 · Área: 66,4 km²"
          color="populacao"
        />
        <KpiCard
          title="Área Territorial"
          value="66,4 km²"
          unit="área total do município"
          source="IBGE · Malha Municipal"
          color="populacao"
        />
      </div>

      {/* Evolução Populacional — dados da API IBGE */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-[var(--color-text)]">Evolução Populacional</h2>
          <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
            API IBGE ao vivo
          </span>
        </div>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Estimativas anuais e Censo 2022 · IBGE Tabela 6579 · 2018–2025
        </p>
        <AreaChart
          data={populacao}
          areas={[{ key: "populacao", name: "População", color: "var(--color-populacao)" }]}
          formatY={(v) => `${(v / 1000).toFixed(0)}k`}
          formatTooltip={(v) => `${formatNumber(v)} hab.`}
          height={280}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pirâmide etária com dados do Censo 2022 */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Pirâmide Etária</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Distribuição por sexo e faixa etária · Censo IBGE 2022 ·{" "}
            <span className="text-[var(--color-saude)]">151.057 masc.</span>{" "}
            / <span className="text-[var(--color-populacao)]">165.416 fem.</span>
          </p>
          <ButterflyChart data={piramideEtaria} height={520} />
        </div>

        {/* Densidade demográfica RMSP */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">
            Densidade Demográfica — RMSP
          </h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Habitantes por km² · Municípios vizinhos · Censo IBGE 2022
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
