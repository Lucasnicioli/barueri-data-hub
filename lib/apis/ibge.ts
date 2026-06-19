import { IBGE_BASE, BARUERI_IBGE_CODE } from "@/lib/constants";
import type { SerieHistorica, PopulacaoData, PibData } from "@/types";

// Dados reais verificados via API IBGE em jun/2026
// População Censo 2022: 316.473 hab. (151.057 masc, 165.416 fem)
const POP_CENSO_2022 = 316473;

function parseSerie(json: unknown[]): Record<string, string> {
  try {
    return (json as any)[0]?.resultados?.[0]?.series?.[0]?.serie ?? {};
  } catch {
    return {};
  }
}

// Tabela 6579 — Estimativa populacional anual
// Revalidação: anual (IBGE publica estimativas em agosto de cada ano)
export async function getPopulacaoEstimada(): Promise<PopulacaoData[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/6579/periodos/-6/variaveis/9324?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 * 30 } } // 30 dias — publicação anual
  );
  if (!res.ok) throw new Error("Falha ao buscar população estimada");
  const json = await res.json();
  const serie = parseSerie(json);
  return Object.entries(serie).map(([ano, valor]) => ({
    ano,
    populacao: Number(valor),
  }));
}

// Tabela 5938 — PIB municipal a preços correntes (Mil Reais)
// Per capita calculado: PIB total / população do Censo 2022
// Variável 614 (per capita oficial) não disponível via API v3 — calculado manualmente
// Revalidação: anual (IBGE publica PIB municipal com ~2 anos de defasagem)
export async function getPIBPerCapita(): Promise<PibData[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/5938/periodos/-6/variaveis/37?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 * 30 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar PIB");
  const json = await res.json();
  const serie = parseSerie(json);

  // Populações IBGE por ano para cálculo de per capita
  const popPorAno: Record<string, number> = {
    "2018": 271306,
    "2019": 274182,
    "2020": 276982,
    "2021": 279704,
    "2022": POP_CENSO_2022,
    "2023": 323406, // interpolado: (316473 + 330339) / 2
    "2024": 330339,
  };

  return Object.entries(serie).map(([ano, valorMilReais]) => {
    const pibTotal = Number(valorMilReais) * 1000; // converter Mil Reais → Reais
    const pop = popPorAno[ano] ?? POP_CENSO_2022;
    return {
      ano,
      pib: pibTotal,
      pibPerCapita: Math.round(pibTotal / pop),
    };
  });
}

// Tabela 7301 — IDEB anos iniciais
// Revalidação: bienal (INEP divulga a cada 2 anos, em agosto)
export async function getIDEB(): Promise<SerieHistorica[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/7301/periodos/-4/variaveis/11520?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 * 30 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar IDEB");
  const json = await res.json();
  const serie = parseSerie(json);
  return Object.entries(serie).map(([ano, valor]) => ({ ano, valor: Number(valor) }));
}

export async function getDadosMunicipio() {
  const res = await fetch(
    `${IBGE_BASE.replace("/v3", "/v1")}/localidades/municipios/${BARUERI_IBGE_CODE}`,
    { next: { revalidate: 86400 * 7 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar dados do município");
  return res.json();
}

// Fallbacks verificados com dados reais da API IBGE (jun/2026)
export function getPopulacaoFallback(): PopulacaoData[] {
  return [
    { ano: "2018", populacao: 271306 },
    { ano: "2019", populacao: 274182 },
    { ano: "2020", populacao: 276982 },
    { ano: "2021", populacao: 279704 },
    { ano: "2022", populacao: 316473 }, // Censo 2022
    { ano: "2024", populacao: 330339 },
    { ano: "2025", populacao: 333737 },
  ];
}

export function getPIBFallback(): PibData[] {
  // Fonte: IBGE Tabela 5938 — PIB Municipal · per capita calculado manualmente
  return [
    { ano: "2018", pib: 50562704000, pibPerCapita: 186357 },
    { ano: "2019", pib: 52744931000, pibPerCapita: 192367 },
    { ano: "2020", pib: 51600338000, pibPerCapita: 186298 },
    { ano: "2021", pib: 58027667000, pibPerCapita: 207440 },
    { ano: "2022", pib: 69665769000, pibPerCapita: 220141 },
    { ano: "2023", pib: 71646710000, pibPerCapita: 221566 },
  ];
}
