"use client";

import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import {
  getMortalidadeInfantilEstatica,
  getCoberturaVacinalEstatica,
  getInternacoesEstaticas,
} from "@/lib/apis/datasus";

const mortalidade = getMortalidadeInfantilEstatica();
const internacoes = getInternacoesEstaticas();
const vacinacao = getCoberturaVacinalEstatica();

const causasInternacao = [
  { causa: "Doenças Respiratórias", valor: 28.4 },
  { causa: "Doenças Circulatórias", valor: 22.1 },
  { causa: "Causas Externas", valor: 15.6 },
  { causa: "Neoplasias", valor: 12.3 },
  { causa: "Doenças Infecciosas", valor: 8.9 },
  { causa: "Diarreia e Gastroenterite", valor: 5.2 },
  { causa: "Outras", valor: 7.5 },
];

const comparativoSP = [
  { indicador: "Mortalidade Infantil", barueri: 5.88, estadoSP: 11.2 },
  { indicador: "Leitos/1.000 hab.", barueri: 2.1, estadoSP: 2.4 },
  { indicador: "Cobertura ESF (%)", barueri: 68, estadoSP: 55 },
];

export default function SaudePage() {
  const ultimaMortalidade = mortalidade[mortalidade.length - 1]?.valor ?? 0;
  const varMortalidade = (
    ((mortalidade[mortalidade.length - 1]?.valor - mortalidade[0]?.valor) /
      mortalidade[0]?.valor) *
    100
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="Saúde Pública"
        subtitle="Indicadores vitais, rede de atenção e imunização · Barueri/SP"
        color="var(--color-saude)"
      />

      {/* KPIs Saúde */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="Mortalidade Infantil"
          value={String(ultimaMortalidade).replace(".", ",")}
          unit="por mil nascidos vivos"
          trend={`${varMortalidade}%`}
          trendDirection="down"
          trendPositive
          source="DATASUS/SIM 2023"
          color="saude"
        />
        <KpiCard
          title="Estabelecimentos de Saúde"
          value="127"
          unit="unidades ativas (CNES)"
          trend="+3"
          trendDirection="up"
          trendPositive
          source="CNES 2024"
          color="saude"
        />
        <KpiCard
          title="Cobertura ESF"
          value="68%"
          unit="Estratégia Saúde da Família"
          trend="+4pp"
          trendDirection="up"
          trendPositive
          source="e-Gestor AB 2024"
          color="saude"
        />
        <KpiCard
          title="Agentes Comunitários"
          value="312"
          unit="ACS ativos"
          source="e-Gestor AB 2024"
          color="saude"
        />
      </div>

      {/* Mortalidade e Internações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Mortalidade Infantil</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Por mil nascidos vivos · DATASUS/SIM · 2015–2023
          </p>
          <LineChart
            data={mortalidade}
            lines={[{ key: "valor", name: "Óbitos / mil nasc. vivos", color: "var(--color-saude)" }]}
            formatY={(v) => `${v}`}
            formatTooltip={(v) => `${v} óbitos/mil nasc.`}
          />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">
            Internações por Diarreia
          </h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Por mil habitantes · DATASUS/SIH · 2015–2023
          </p>
          <LineChart
            data={internacoes}
            lines={[{ key: "valor", name: "Internações / mil hab.", color: "#F97316" }]}
            formatY={(v) => `${v}`}
            formatTooltip={(v) => `${v} internações/mil hab.`}
          />
        </div>
      </div>

      {/* Causas de Internação */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">
          Principais Causas de Internação
        </h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Percentual do total · DATASUS/SIH 2023
        </p>
        <BarChart
          data={causasInternacao}
          bars={[{ key: "valor", name: "% do total de internações", color: "var(--color-saude)" }]}
          xKey="causa"
          layout="vertical"
          height={320}
          formatY={(v) => `${v}%`}
          formatTooltip={(v) => `${v}%`}
        />
      </div>

      {/* Cobertura Vacinal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Cobertura Vacinal</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Por imunobiológico · SI-PNI 2023 · Meta: 95%
          </p>
          <BarChart
            data={vacinacao}
            bars={[
              { key: "cobertura", name: "Cobertura (%)", color: "var(--color-saude)" },
              { key: "meta", name: "Meta (%)", color: "#E5E7EB" },
            ]}
            xKey="imunobiologico"
            layout="vertical"
            height={360}
            formatY={(v) => `${v}%`}
            formatTooltip={(v) => `${v}%`}
          />
        </div>

        {/* Comparativo Regional */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">
            Barueri vs Estado de SP
          </h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Principais indicadores de saúde comparativos
          </p>
          <BarChart
            data={comparativoSP}
            bars={[
              { key: "barueri", name: "Barueri", color: "var(--color-saude)" },
              { key: "estadoSP", name: "Estado de SP", color: "#CBD5E1" },
            ]}
            xKey="indicador"
            height={320}
          />

          <div className="mt-4 grid grid-cols-1 gap-3">
            {[
              { label: "Mortalidade Infantil", barueri: "5,88", sp: "11,2", melhor: true },
              { label: "Cobertura ESF", barueri: "68%", sp: "55%", melhor: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg text-sm"
              >
                <span className="text-[var(--color-muted)]">{item.label}</span>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-[var(--color-saude)]">
                    Barueri: {item.barueri}
                  </span>
                  <span className="text-[var(--color-muted)]">SP: {item.sp}</span>
                  {item.melhor && (
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                      Melhor
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
