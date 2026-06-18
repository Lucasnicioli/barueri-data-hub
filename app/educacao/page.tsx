"use client";

import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

const idebHistorico = [
  { ano: "2011", anosIniciais: 5.9, anosFinal: 4.7, metaNacional: 5.0 },
  { ano: "2013", anosIniciais: 6.3, anosFinal: 5.0, metaNacional: 5.2 },
  { ano: "2015", anosIniciais: 6.6, anosFinal: 5.2, metaNacional: 5.5 },
  { ano: "2017", anosIniciais: 6.8, anosFinal: 5.4, metaNacional: 5.7 },
  { ano: "2019", anosIniciais: 7.1, anosFinal: 5.7, metaNacional: 6.0 },
  { ano: "2021", anosIniciais: 6.8, anosFinal: 5.4, metaNacional: 6.0 },
  { ano: "2023", anosIniciais: 7.3, anosFinal: 5.9, metaNacional: 6.0 },
];

const matriculas = [
  { nivel: "Educação Infantil", matriculas: 18420 },
  { nivel: "Ensino Fundamental", matriculas: 42380 },
  { nivel: "Ensino Médio", matriculas: 18950 },
  { nivel: "EJA", matriculas: 3240 },
  { nivel: "Educação Especial", matriculas: 1870 },
];

const comparativoMunicipios = [
  { municipio: "Barueri", ideb: 7.3 },
  { municipio: "Carapicuíba", ideb: 5.9 },
  { municipio: "Osasco", ideb: 6.4 },
  { municipio: "Santana de Parnaíba", ideb: 6.8 },
  { municipio: "Jandira", ideb: 6.1 },
];

export default function EducacaoPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="Educação"
        subtitle="IDEB, matrículas e comparativo regional · Barueri/SP"
        color="var(--color-educacao)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <KpiCard
          title="IDEB Anos Iniciais"
          value="7,3"
          unit="escolas municipais (2023)"
          trend="+0,5"
          trendDirection="up"
          trendPositive
          source="INEP 2023"
          color="educacao"
        />
        <KpiCard
          title="IDEB Anos Finais"
          value="5,9"
          unit="escolas municipais (2023)"
          trend="+0,5"
          trendDirection="up"
          trendPositive
          source="INEP 2023"
          color="educacao"
        />
        <KpiCard
          title="Total de Matrículas"
          value="84.860"
          unit="alunos matriculados"
          trend="+1,2%"
          trendDirection="up"
          trendPositive
          source="INEP/Censo Escolar 2023"
          color="educacao"
        />
        <KpiCard
          title="Taxa de Escolarização"
          value="97,8%"
          unit="faixa 6–14 anos"
          trend="+0,3pp"
          trendDirection="up"
          trendPositive
          source="IBGE 2022"
          color="educacao"
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <h2 className="font-semibold text-[var(--color-text)] mb-1">Evolução do IDEB</h2>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Anos iniciais, anos finais e meta nacional · INEP · 2011–2023
        </p>
        <LineChart
          data={idebHistorico}
          lines={[
            { key: "anosIniciais", name: "Anos Iniciais", color: "var(--color-educacao)" },
            { key: "anosFinal", name: "Anos Finais", color: "#A78BFA" },
            { key: "metaNacional", name: "Meta Nacional", color: "#E5E7EB" },
          ]}
          formatY={(v) => String(v)}
          formatTooltip={(v, n) => `${v} — ${n}`}
          height={320}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Matrículas por Nível</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Total de alunos · Censo Escolar 2023
          </p>
          <BarChart
            data={matriculas}
            bars={[{ key: "matriculas", name: "Matrículas", color: "var(--color-educacao)" }]}
            xKey="nivel"
            layout="vertical"
            height={300}
            formatY={(v) => `${(v / 1000).toFixed(0)}k`}
            formatTooltip={(v) => `${v.toLocaleString("pt-BR")} alunos`}
          />
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">IDEB — Comparativo Regional</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Barueri vs municípios vizinhos · Anos iniciais 2023
          </p>
          <BarChart
            data={comparativoMunicipios}
            bars={[{ key: "ideb", name: "IDEB Anos Iniciais", color: "var(--color-educacao)" }]}
            xKey="municipio"
            height={300}
            formatY={(v) => String(v)}
            formatTooltip={(v) => `IDEB ${v}`}
          />
        </div>
      </div>
    </div>
  );
}
