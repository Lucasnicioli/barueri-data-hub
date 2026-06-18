import { IBGE_BASE, BARUERI_IBGE_CODE } from "@/lib/constants";
import type { SerieHistorica, PopulacaoData, PibData } from "@/types";

function parseResultados(json: unknown[]): SerieHistorica[] {
  try {
    const res = (json as any)[0]?.resultados?.[0]?.series?.[0]?.serie ?? {};
    return Object.entries(res).map(([ano, valor]) => ({
      ano,
      valor: Number(valor),
    }));
  } catch {
    return [];
  }
}

export async function getPIBPerCapita(): Promise<PibData[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/5938/periodos/-6/variaveis/37?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar PIB per capita");
  const json = await res.json();
  return parseResultados(json).map((s) => ({
    ano: s.ano,
    pib: 0,
    pibPerCapita: s.valor,
  }));
}

export async function getPopulacaoEstimada(): Promise<PopulacaoData[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/6579/periodos/-6/variaveis/9324?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar população estimada");
  const json = await res.json();
  return parseResultados(json).map((s) => ({
    ano: s.ano,
    populacao: s.valor,
  }));
}

export async function getIDEB(): Promise<SerieHistorica[]> {
  const res = await fetch(
    `${IBGE_BASE}/agregados/7301/periodos/-4/variaveis/11520?localidades=N6[${BARUERI_IBGE_CODE}]`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar IDEB");
  const json = await res.json();
  return parseResultados(json);
}

export async function getDadosMunicipio() {
  const res = await fetch(
    `${IBGE_BASE.replace("/v3", "/v1")}/localidades/municipios/${BARUERI_IBGE_CODE}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar dados do município");
  return res.json();
}
