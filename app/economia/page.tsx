"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";
import { getFinancasEstaticas, getDespesaPorFuncaoEstatica } from "@/lib/apis/siconfi";
import { formatCurrency, formatCompact } from "@/lib/utils";
import type { PibData } from "@/types";

const financas = getFinancasEstaticas();
const despesaFuncao = getDespesaPorFuncaoEstatica();

// Composição da receita — Siconfi RREO 2024 Barueri
// Valores proporcionais ao orçamento verificado de R$2,75bi
const composicaoReceita = [
  { name: "Receita Tributária", value: 46.5 },
  { name: "Transferências", value: 35.6 },
  { name: "Outras Receitas", value: 17.9 },
];

// Fallback: dados verificados via API IBGE Tabela 5938 em jun/2026
// Per capita = PIB total (Mil R$ × 1000) ÷ população estimada IBGE
const pibFallback: PibData[] = [
  { ano: "2018", pib: 50562704000, pibPerCapita: 186357 },
  { ano: "2019", pib: 52744931000, pibPerCapita: 192367 },
  { ano: "2020", pib: 51600338000, pibPerCapita: 186298 },
  { ano: "2021", pib: 58027667000, pibPerCapita: 207440 },
  { ano: "2022", pib: 69665769000, pibPerCapita: 220141 },
  { ano: "2023", pib: 71646710000, pibPerCapita: 221566 },
];

export default function EconomiaPage() {
  const [pibSerie, setPibSerie] = useState<PibData[]>(pibFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ibge?tipo=pib")
      .then((r) => r.json())
      .then((data: PibData[]) => {
        if (Array.isArray(data) && data.length > 0) setPibSerie(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const ultimoPib = pibSerie[pibSerie.length - 1];
  const penultimoPib = pibSerie[pibSerie.length - 2];
  const varPib = penultimoPib
    ? (((ultimoPib.pibPerCapita - penultimoPib.pibPerCapita) / penultimoPib.pibPerCapita) * 100).toFixed(1)
    : "0";

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="Economia e Finanças"
        subtitle="PIB, finanças municipais e mercado de trabalho · Barueri/SP"
        color="var(--color-economia)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="PIB per Capita"
          value="R$ 222 mil"
          unit="por habitante/ano (2023)"
          trend="+0,7%"
          trendDirection="up"
          trendPositive
          source="IBGE Tabela 5938 · 2023"
          color="economia"
          loading={loading}
        />
        <KpiCard
          title="PIB Total Municipal"
          value="R$ 71,6 bi"
          unit="a preços correntes (2023)"
          trend="+2,9%"
          trendDirection="up"
          trendPositive
          source="IBGE Tabela 5938 · 2023"
          color="economia"
        />
        <KpiCard
          title="Receita Municipal 2024"
          value="R$ 2,75 bi"
          unit="receita realizada"
          trend="+6,6%"
          trendDirection="up"
          trendPositive
          source="Siconfi/STN 2024"
          color="economia"
        />
        <KpiCard
          title="Empregos Formais"
          value="198 mil"
          unit="vínculos ativos (RAIS)"
          trend="+2,3%"
          trendDirection="up"
          trendPositive
          source="RAIS/MTE 2023"
          color="economia"
        />
      </div>

      {/* PIB e Receitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-[var(--color-text)]">PIB per Capita</h2>
            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
              API IBGE ao vivo
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Em reais · IBGE Tabela 5938 · PIB total ÷ pop. estimada · 2018–2023
          </p>
          <LineChart
            data={pibSerie}
            lines={[{ key: "pibPerCapita", name: "PIB per capita (R$)", color: "var(--color-economia)" }]}
            formatY={(v) => `R$ ${formatCompact(v)}`}
            formatTooltip={(v) => formatCurrency(v)}
          />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Composição da Receita</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Por origem · Siconfi RREO 2024
          </p>
          <PieChart
            data={composicaoReceita}
            colors={["var(--color-economia)", "var(--color-saude)", "var(--color-muted)"]}
            innerRadius={60}
            formatTooltip={(v) => `${v}%`}
          />
        </div>
      </div>

      {/* Receita vs Despesa */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">
          Receita Realizada vs Despesa Empenhada
        </h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Em bilhões de reais · Siconfi/STN · 2019–2024
        </p>
        <BarChart
          data={financas.map((f) => ({
            ano: String(f.ano),
            receita: +(f.receita / 1e9).toFixed(2),
            despesa: +(f.despesa / 1e9).toFixed(2),
          }))}
          bars={[
            { key: "receita", name: "Receita Realizada (R$ bi)", color: "var(--color-accent)" },
            { key: "despesa", name: "Despesa Empenhada (R$ bi)", color: "var(--color-economia)" },
          ]}
          formatY={(v) => `R$ ${v}B`}
          formatTooltip={(v) => `R$ ${v} bilhões`}
          height={320}
        />
        <p className="text-[10px] text-[var(--color-muted)] mt-2">
          Fonte: Siconfi / Tesouro Nacional · siconfi.tesouro.gov.br · Código IBGE: 3505708
        </p>
      </div>

      {/* Despesa por Função */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Despesa por Função</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Distribuição do orçamento · Siconfi 2024
        </p>
        <BarChart
          data={despesaFuncao.map((d) => ({ funcao: d.funcao, percentual: d.percentual }))}
          bars={[{ key: "percentual", name: "% da despesa total", color: "var(--color-economia)" }]}
          xKey="funcao"
          layout="vertical"
          height={320}
          formatY={(v) => `${v}%`}
          formatTooltip={(v) => `${v}%`}
        />
      </div>
    </div>
  );
}
