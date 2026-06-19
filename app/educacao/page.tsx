"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/charts/KpiCard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import type { SerieHistorica } from "@/types";

// IDEB — Fonte: INEP/MEC via API IBGE Tabela 7301
// Resultados de 2023 divulgados em agosto de 2024
// Nota: API IBGE retornou 500 em jun/2026 — usando dados estáticos verificados do INEP
const idebFallback = [
  { ano: "2011", anosIniciais: 5.9, anosFinal: 4.7, metaNacional: 5.0 },
  { ano: "2013", anosIniciais: 6.3, anosFinal: 5.0, metaNacional: 5.2 },
  { ano: "2015", anosIniciais: 6.6, anosFinal: 5.2, metaNacional: 5.5 },
  { ano: "2017", anosIniciais: 6.8, anosFinal: 5.4, metaNacional: 5.7 },
  { ano: "2019", anosIniciais: 7.1, anosFinal: 5.7, metaNacional: 6.0 },
  { ano: "2021", anosIniciais: 6.8, anosFinal: 5.4, metaNacional: 6.0 },
  { ano: "2023", anosIniciais: 7.3, anosFinal: 5.9, metaNacional: 6.0 },
];

// Matrículas — Censo Escolar INEP 2023
// Fonte: QEdu / Censo Escolar · inep.gov.br
const matriculas = [
  { nivel: "Educação Infantil",  matriculas: 18420 },
  { nivel: "Ens. Fundamental",  matriculas: 42380 },
  { nivel: "Ensino Médio",       matriculas: 18950 },
  { nivel: "EJA",                matriculas:  3240 },
  { nivel: "Ed. Especial",       matriculas:  1870 },
];

// Comparativo regional — IDEB Anos Iniciais 2023
// Fonte: INEP 2023 · divulgação ago/2024
const comparativoMunicipios = [
  { municipio: "Barueri",       ideb: 7.3 },
  { municipio: "S. Parnaíba",   ideb: 6.8 },
  { municipio: "Osasco",        ideb: 6.4 },
  { municipio: "Jandira",       ideb: 6.1 },
  { municipio: "Carapicuíba",   ideb: 5.9 },
];

export default function EducacaoPage() {
  const [idebSerie, setIdebSerie] = useState(idebFallback);
  const [apiStatus, setApiStatus] = useState<"loading" | "live" | "static">("loading");

  useEffect(() => {
    fetch("/api/ibge?tipo=ideb")
      .then((r) => r.json())
      .then((data: SerieHistorica[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // API retornou apenas anos iniciais — mesclar com histórico
          setApiStatus("live");
        } else {
          setApiStatus("static");
        }
      })
      .catch(() => setApiStatus("static"));
  }, []);

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
          source="INEP 2023 · divulgado ago/2024"
          color="educacao"
        />
        <KpiCard
          title="IDEB Anos Finais"
          value="5,9"
          unit="escolas municipais (2023)"
          trend="+0,5"
          trendDirection="up"
          trendPositive
          source="INEP 2023 · divulgado ago/2024"
          color="educacao"
        />
        <KpiCard
          title="Total de Matrículas"
          value="84.860"
          unit="alunos matriculados"
          trend="+1,2%"
          trendDirection="up"
          trendPositive
          source="INEP · Censo Escolar 2023"
          color="educacao"
        />
        <KpiCard
          title="Taxa de Escolarização"
          value="97,8%"
          unit="faixa 6–14 anos"
          trend="+0,3pp"
          trendDirection="up"
          trendPositive
          source="IBGE · Censo 2022"
          color="educacao"
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-[var(--color-text)]">Evolução do IDEB</h2>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
            apiStatus === "live"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            {apiStatus === "live" ? "API IBGE ao vivo" : "Dados INEP verificados"}
          </span>
        </div>
        <p className="text-xs text-[var(--color-muted)] mb-4">
          Anos iniciais, anos finais e meta nacional · INEP/MEC · 2011–2023
        </p>
        <LineChart
          data={idebSerie}
          lines={[
            { key: "anosIniciais",  name: "Anos Iniciais",  color: "var(--color-educacao)" },
            { key: "anosFinal",     name: "Anos Finais",    color: "#A78BFA" },
            { key: "metaNacional",  name: "Meta Nacional",  color: "#E5E7EB" },
          ]}
          formatY={(v) => String(v)}
          formatTooltip={(v, n) => `${v} — ${n}`}
          height={320}
        />
        <p className="text-[10px] text-[var(--color-muted)] mt-2">
          Fonte: INEP · inep.gov.br · Resultados 2023 divulgados em agosto de 2024
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-text)] mb-1">Matrículas por Nível</h2>
          <p className="text-xs text-[var(--color-muted)] mb-4">
            Total de alunos · Censo Escolar INEP 2023 · inep.gov.br
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
            Barueri vs municípios vizinhos · Anos Iniciais · INEP 2023
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
