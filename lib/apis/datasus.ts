import { DATASUS_API } from "@/lib/constants";
import type { EstabelecimentoSaude, SaudeIndicador, CoberturaVacinal } from "@/types";

export async function getEstabelecimentosSaude(): Promise<EstabelecimentoSaude[]> {
  const res = await fetch(
    `${DATASUS_API}/cnes/estabelecimentos?co_municipio=350570&limit=100`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar estabelecimentos de saúde");
  const json = await res.json();
  return json?.itens ?? [];
}

// Dados estáticos de fallback para mortalidade infantil (DATASUS/SIM)
// Fonte: DATASUS TabNet — Barueri/SP, série histórica
export function getMortalidadeInfantilEstatica(): SaudeIndicador[] {
  return [
    { ano: "2015", valor: 9.2, indicador: "Mortalidade Infantil" },
    { ano: "2016", valor: 8.7, indicador: "Mortalidade Infantil" },
    { ano: "2017", valor: 8.1, indicador: "Mortalidade Infantil" },
    { ano: "2018", valor: 7.6, indicador: "Mortalidade Infantil" },
    { ano: "2019", valor: 7.0, indicador: "Mortalidade Infantil" },
    { ano: "2020", valor: 6.8, indicador: "Mortalidade Infantil" },
    { ano: "2021", valor: 6.4, indicador: "Mortalidade Infantil" },
    { ano: "2022", valor: 6.1, indicador: "Mortalidade Infantil" },
    { ano: "2023", valor: 5.88, indicador: "Mortalidade Infantil" },
  ];
}

export function getCoberturaVacinalEstatica(): CoberturaVacinal[] {
  return [
    { imunobiologico: "BCG", cobertura: 95.2, meta: 90 },
    { imunobiologico: "Hepatite B", cobertura: 92.1, meta: 90 },
    { imunobiologico: "Pentavalente", cobertura: 88.7, meta: 95 },
    { imunobiologico: "VIP/VOP", cobertura: 87.4, meta: 95 },
    { imunobiologico: "Pneumocócica", cobertura: 86.9, meta: 95 },
    { imunobiologico: "Rotavírus", cobertura: 84.3, meta: 95 },
    { imunobiologico: "Meningocócica C", cobertura: 83.1, meta: 95 },
    { imunobiologico: "Febre Amarela", cobertura: 79.8, meta: 95 },
    { imunobiologico: "Tríplice Viral", cobertura: 89.5, meta: 95 },
  ];
}

export function getInternacoesEstaticas(): SaudeIndicador[] {
  return [
    { ano: "2015", valor: 4.2, indicador: "Diarreia" },
    { ano: "2016", valor: 3.9, indicador: "Diarreia" },
    { ano: "2017", valor: 3.5, indicador: "Diarreia" },
    { ano: "2018", valor: 3.1, indicador: "Diarreia" },
    { ano: "2019", valor: 2.8, indicador: "Diarreia" },
    { ano: "2020", valor: 2.4, indicador: "Diarreia" },
    { ano: "2021", valor: 2.2, indicador: "Diarreia" },
    { ano: "2022", valor: 2.0, indicador: "Diarreia" },
    { ano: "2023", valor: 1.8, indicador: "Diarreia" },
  ];
}
