export interface SerieHistorica {
  ano: string;
  valor: number;
}

export interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendPositive?: boolean;
  source?: string;
  color?: "saude" | "economia" | "educacao" | "populacao" | "primary";
  loading?: boolean;
}

export interface EstabelecimentoSaude {
  co_cnes: string;
  no_fantasia: string;
  tp_unidade: string;
  no_logradouro: string;
  nu_latitude?: number;
  nu_longitude?: number;
}

export interface FinancasMunicipais {
  ano: number;
  receita: number;
  despesa: number;
  receitaTributaria: number;
  transferencias: number;
}

export interface PibData {
  ano: string;
  pib: number;
  pibPerCapita: number;
}

export interface PopulacaoData {
  ano: string;
  populacao: number;
}

export interface SaudeIndicador {
  ano: string;
  valor: number;
  indicador: string;
}

export interface CoberturaVacinal {
  imunobiologico: string;
  cobertura: number;
  meta: number;
}
