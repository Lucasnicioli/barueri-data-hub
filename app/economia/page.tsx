"use client";

import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart } from "@/components/charts/PieChart";
import { getFinancasEstaticas, getDespesaPorFuncaoEstatica } from "@/lib/apis/siconfi";
import { formatCurrency, formatCompact } from "@/lib/utils";

const financas = getFinancasEstaticas();
const despesaFuncao = getDespesaPorFuncaoEstatica();

const pibHistorico = [
  { ano: "2017", pibPerCapita: 88400 },
  { ano: "2018", pibPerCapita: 92100 },
  { ano: "2019", pibPerCapita: 97800 },
  { ano: "2020", pibPerCapita: 95200 },
  { ano: "2021", pibPerCapita: 101500 },
  { ano: "2022", pibPerCapita: 108300 },
];

const composicaoReceita = [
  { name: "Receita Tributária", value: 46.5 },
  { name: "Transferências", value: 35.6 },
  { name: "Outras", value: 17.9 },
];

export default function EconomiaPage() {
  const ultimaFinanca = financas[financas.length - 1];
  const financa2023 = financas.find((f) => f.ano === 2023)!;

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
          value="R$ 108,3 mil"
          unit="por habitante/ano (2022)"
          trend="+6,7%"
          trendDirection="up"
          trendPositive
          source="IBGE 2022"
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
          title="Ranking PIB/SP"
          value="12º"
          unit="entre municípios do estado"
          source="IBGE 2022"
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
          <h2 className="font-semibold text-[var(--color-text)] mb-1">PIB per Capita</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">Em reais · IBGE · 2017–2022</p>
          <LineChart
            data={pibHistorico}
            lines={[{ key: "pibPerCapita", name: "PIB per capita (R$)", color: "var(--color-economia)" }]}
            formatY={(v) => `R$ ${formatCompact(v)}`}
            formatTooltip={(v) => formatCurrency(v)}
          />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Composição da Receita</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">Por origem · Siconfi 2024</p>
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
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Receita Realizada vs Despesa Empenhada</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">Em bilhões de reais · Siconfi/STN · 2019–2024</p>
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
      </div>

      {/* Despesa por Função */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Despesa por Função</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">Distribuição do orçamento · Siconfi 2024</p>
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
