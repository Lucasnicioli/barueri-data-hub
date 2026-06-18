import { SICONFI_BASE, BARUERI_IBGE_CODE } from "@/lib/constants";
import type { FinancasMunicipais } from "@/types";

export async function getReceitasMunicipais(ano: number) {
  const res = await fetch(
    `${SICONFI_BASE}/rreo?co_ibge=${BARUERI_IBGE_CODE}&an_exercicio=${ano}&nr_periodo=6`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("Falha ao buscar receitas municipais");
  return res.json();
}

// Dados estáticos de fallback — Siconfi / Tesouro Nacional
// Fonte: Portal Siconfi — Barueri/SP
export function getFinancasEstaticas(): FinancasMunicipais[] {
  return [
    { ano: 2019, receita: 1_820_000_000, despesa: 1_750_000_000, receitaTributaria: 820_000_000, transferencias: 680_000_000 },
    { ano: 2020, receita: 1_890_000_000, despesa: 1_920_000_000, receitaTributaria: 850_000_000, transferencias: 720_000_000 },
    { ano: 2021, receita: 2_100_000_000, despesa: 1_980_000_000, receitaTributaria: 920_000_000, transferencias: 790_000_000 },
    { ano: 2022, receita: 2_350_000_000, despesa: 2_210_000_000, receitaTributaria: 1_050_000_000, transferencias: 850_000_000 },
    { ano: 2023, receita: 2_580_000_000, despesa: 2_420_000_000, receitaTributaria: 1_180_000_000, transferencias: 920_000_000 },
    { ano: 2024, receita: 2_750_000_000, despesa: 2_600_000_000, receitaTributaria: 1_280_000_000, transferencias: 980_000_000 },
  ];
}

export function getDespesaPorFuncaoEstatica() {
  return [
    { funcao: "Saúde", valor: 720_000_000, percentual: 27.7 },
    { funcao: "Educação", valor: 650_000_000, percentual: 25.0 },
    { funcao: "Administração", valor: 390_000_000, percentual: 15.0 },
    { funcao: "Urbanismo", valor: 260_000_000, percentual: 10.0 },
    { funcao: "Assistência Social", valor: 195_000_000, percentual: 7.5 },
    { funcao: "Segurança Pública", valor: 130_000_000, percentual: 5.0 },
    { funcao: "Outras", valor: 255_000_000, percentual: 9.8 },
  ];
}
