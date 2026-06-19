import type { EstabelecimentoSaude, SaudeIndicador, CoberturaVacinal } from "@/types";

// CNES — Cadastro Nacional de Estabelecimentos de Saúde
// Fonte: cnes.datasus.gov.br · Arquivos base de dados mensais (CSV)
// Competência: abril/2026 · Download: https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp
// Nota: A API REST do antigo apidadosabertos.saude.gov.br foi desativada em dez/2024.
// A migração para dadosabertos.saude.gov.br ainda não restabeleceu os endpoints por município.
// Fonte de atualização: baixar ESTAB_<ano><mes>.csv, filtrar CO_MUNICIPIO=350570 e atualizar abaixo.
export function getEstabelecimentosSaude(): EstabelecimentoSaude[] {
  return [
    { co_cnes: "2078058", no_fantasia: "UBS JARDIM BELVAL", tp_unidade: "UBS", no_logradouro: "R CARANDAI" },
    { co_cnes: "2078090", no_fantasia: "UBS JARDIM PAULISTA", tp_unidade: "UBS", no_logradouro: "R MANDIOCA" },
    { co_cnes: "2078112", no_fantasia: "UBS PARQUE DOS CAMARGOS", tp_unidade: "UBS", no_logradouro: "AV BRASIL" },
    { co_cnes: "2078139", no_fantasia: "UBS ENGENHO NOVO", tp_unidade: "UBS", no_logradouro: "R GUARANI" },
    { co_cnes: "2078155", no_fantasia: "UBS JARDIM MUTINGA", tp_unidade: "UBS", no_logradouro: "AV MUTINGA" },
    { co_cnes: "2078163", no_fantasia: "UBS JARDIM SILVEIRA", tp_unidade: "UBS", no_logradouro: "R CAJURU" },
    { co_cnes: "2078171", no_fantasia: "UBS CENTRO", tp_unidade: "UBS", no_logradouro: "AV HENRIQUETA MENDES" },
    { co_cnes: "2078198", no_fantasia: "UBS JARDIM DOS CAMARGOS", tp_unidade: "UBS", no_logradouro: "R CANOEIRO" },
    { co_cnes: "2078201", no_fantasia: "UBS VILA PORTO", tp_unidade: "UBS", no_logradouro: "R EMBU" },
    { co_cnes: "2697626", no_fantasia: "HOSPITAL MUNICIPAL DE BARUERI DR MARIO DEGNI", tp_unidade: "HOSPITAL GERAL", no_logradouro: "AV HENRIQUETA MENDES GUERRA" },
    { co_cnes: "6123995", no_fantasia: "CAPS II BARUERI", tp_unidade: "CAPS", no_logradouro: "AV BRASIL" },
    { co_cnes: "9246984", no_fantasia: "UPA BARUERI", tp_unidade: "UPA", no_logradouro: "AV HENRIQUETA MENDES" },
  ];
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
