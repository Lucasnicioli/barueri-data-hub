"use client";

import { Header } from "@/components/layout/Header";
import { ExternalLink, CheckCircle, AlertTriangle, Clock, RefreshCw } from "lucide-react";

type FonteStatus = "ativo" | "estatico" | "indisponivel";

interface Fonte {
  modulo: string;
  indicador: string;
  fonte: string;
  organizacao: string;
  ultimaPublicacao: string;
  periodicidade: string;
  status: FonteStatus;
  metodo: string;
  url: string;
  observacao?: string;
}

const fontes: Fonte[] = [
  // IBGE — ativos via API
  {
    modulo: "Dashboard / População",
    indicador: "População Estimada Anual",
    fonte: "IBGE Tabela 6579 — Variável 9324",
    organizacao: "IBGE",
    ultimaPublicacao: "2025",
    periodicidade: "Anual (agosto)",
    status: "ativo",
    metodo: "API REST ao vivo · revalidação a cada 30 dias",
    url: "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-6/variaveis/9324?localidades=N6[3505708]",
  },
  {
    modulo: "Economia",
    indicador: "PIB Municipal e PIB per Capita",
    fonte: "IBGE Tabela 5938 — Variável 37",
    organizacao: "IBGE",
    ultimaPublicacao: "2023 (divulgado 2025)",
    periodicidade: "Anual (~2 anos de defasagem)",
    status: "ativo",
    metodo: "API REST ao vivo · per capita calculado: PIB total ÷ população IBGE",
    url: "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/-6/variaveis/37?localidades=N6[3505708]",
    observacao: "Variável 614 (per capita oficial) indisponível via API v3 — calculado manualmente",
  },
  {
    modulo: "Educação",
    indicador: "IDEB — Índice de Desenvolvimento da Educação Básica",
    fonte: "IBGE Tabela 7301 — Variável 11520",
    organizacao: "INEP / MEC",
    ultimaPublicacao: "2023 (divulgado ago/2024)",
    periodicidade: "Bienal (anos ímpares)",
    status: "estatico",
    metodo: "API IBGE · instabilidade detectada em jun/2026 · fallback com dados INEP verificados",
    url: "https://download.inep.gov.br/ideb/apresentacao_ideb_2023.pdf",
    observacao: "API IBGE retornou HTTP 500 em jun/2026. Dados estáticos correspondem aos publicados pelo INEP.",
  },

  // DATASUS
  {
    modulo: "Saúde",
    indicador: "Mortalidade Infantil",
    fonte: "DATASUS / SIM — Sistema de Informações sobre Mortalidade",
    organizacao: "Ministério da Saúde",
    ultimaPublicacao: "2023",
    periodicidade: "Anual",
    status: "estatico",
    metodo: "Dados estáticos verificados · tabnet.datasus.gov.br · atualizar via download CSV semestralmente",
    url: "https://svs.aids.gov.br/daent/centrais-de-conteudos/paineis-de-monitoramento/mortalidade/infantil-e-fetal/",
    observacao: "Sem API REST pública. Fonte: Painel de Monitoramento da Mortalidade Infantil e Fetal / SVS.",
  },
  {
    modulo: "Saúde",
    indicador: "Internações por causa",
    fonte: "DATASUS / SIH — Sistema de Informações Hospitalares",
    organizacao: "Ministério da Saúde",
    ultimaPublicacao: "2023",
    periodicidade: "Mensal (consolidação anual)",
    status: "estatico",
    metodo: "Dados estáticos verificados · tabnet.datasus.gov.br",
    url: "https://datasus.saude.gov.br/",
    observacao: "Acesso via TabNet. Recomenda-se atualização semestral via download.",
  },
  {
    modulo: "Saúde",
    indicador: "Cobertura Vacinal",
    fonte: "SI-PNI — Sistema de Informação do PNI",
    organizacao: "Ministério da Saúde",
    ultimaPublicacao: "2022 (sistema legado) · 2023–2025 no novo PNI",
    periodicidade: "Mensal",
    status: "estatico",
    metodo: "Dados estáticos SI-PNI legado (disponível por município até 2022) · novo sistema sem endpoint municipal",
    url: "http://pni.datasus.gov.br/consulta_mrc_13_selecao.php?sel=C02&uf=SP",
    observacao: "Novo PNI disponível com dados desagregados de doses, mas sem REST API por município.",
  },
  {
    modulo: "Saúde",
    indicador: "Estabelecimentos de Saúde (CNES)",
    fonte: "CNES — Cadastro Nacional de Estabelecimentos de Saúde",
    organizacao: "DATASUS / Ministério da Saúde",
    ultimaPublicacao: "Competência abr/2026",
    periodicidade: "Mensal",
    status: "indisponivel",
    metodo: "Dados estáticos com 12 unidades reais de Barueri · atualizar via download CSV mensal",
    url: "https://cnes.datasus.gov.br/pages/downloads/arquivosBaseDados.jsp",
    observacao: "API REST desativada em dez/2024 (migração de domínio). Novo domínio dadosabertos.saude.gov.br ainda sem endpoints por município.",
  },

  // Siconfi
  {
    modulo: "Economia / Dashboard",
    indicador: "Receitas e Despesas Municipais",
    fonte: "Siconfi — RREO (Relatório Resumido da Execução Orçamentária)",
    organizacao: "Tesouro Nacional / STN",
    ultimaPublicacao: "2024 (bimestre 6)",
    periodicidade: "Bimestral",
    status: "estatico",
    metodo: "Dados estáticos verificados · portal Siconfi · siconfi.tesouro.gov.br · código IBGE: 3505708",
    url: "https://siconfi.tesouro.gov.br/",
    observacao: "API pública disponível em apifinanças.tesouro.gov.br. Integração direta planejada para próxima versão.",
  },

  // e-Gestor
  {
    modulo: "Saúde",
    indicador: "Cobertura ESF e ACS",
    fonte: "e-Gestor Atenção Básica — Relatórios Públicos",
    organizacao: "Ministério da Saúde / DAB",
    ultimaPublicacao: "2025 (atualização contínua)",
    periodicidade: "Mensal",
    status: "estatico",
    metodo: "Dados estáticos verificados · egestorab.saude.gov.br",
    url: "https://egestorab.saude.gov.br/paginas/acessoPublico/relatorios/relatoriosPublicos.xhtml",
  },

  // Censo 2022
  {
    modulo: "População",
    indicador: "Pirâmide Etária e Censo 2022",
    fonte: "IBGE — Censo Demográfico 2022",
    organizacao: "IBGE",
    ultimaPublicacao: "jun/2023 (divulgação oficial)",
    periodicidade: "Decenal",
    status: "estatico",
    metodo: "Dados distribuídos proporcionalmente a partir dos totais oficiais: 316.473 hab. (151.057 masc · 165.416 fem)",
    url: "https://cidades.ibge.gov.br/brasil/sp/barueri/pesquisa/10102/122229",
    observacao: "Próximo Censo previsto para 2032.",
  },

  // INEP Matrículas
  {
    modulo: "Educação",
    indicador: "Matrículas por Nível de Ensino",
    fonte: "Censo Escolar — INEP",
    organizacao: "INEP / MEC",
    ultimaPublicacao: "2023",
    periodicidade: "Anual",
    status: "estatico",
    metodo: "Dados estáticos verificados · inep.gov.br",
    url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/censo-escolar",
  },
];

const statusConfig: Record<FonteStatus, { label: string; icon: typeof CheckCircle; classes: string }> = {
  ativo:        { label: "API ao vivo",       icon: CheckCircle,   classes: "bg-green-50 text-green-700 border-green-200" },
  estatico:     { label: "Dados verificados", icon: Clock,         classes: "bg-green-50 text-green-700 border-green-200" },
  indisponivel: { label: "API indisponível",  icon: AlertTriangle, classes: "bg-amber-50 text-amber-700 border-amber-200" },
};

const modulos = [...new Set(fontes.map((f) => f.modulo))];

export default function FontesPage() {
  const ativos    = fontes.filter((f) => f.status === "ativo").length;
  const estaticos = fontes.filter((f) => f.status === "estatico").length;
  const indisponiveis = fontes.filter((f) => f.status === "indisponivel").length;

  return (
    <div className="max-w-7xl mx-auto">
      <Header
        title="Fontes dos Dados"
        subtitle="Rastreabilidade, metodologia e status de cada indicador · Barueri Data Hub"
      />

      {/* Legenda */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-6">
        <h2 className="font-semibold text-sm text-[var(--color-text)] mb-3">Como os dados são atualizados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--color-muted)]">
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
            <span><strong className="text-[var(--color-text)]">API ao vivo</strong> — Dados buscados diretamente da fonte oficial a cada acesso, com cache de 30 dias.</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <span><strong className="text-[var(--color-text)]">Dados verificados</strong> — Valores extraídos manualmente de fontes oficiais e validados. Atualizados conforme a periodicidade da fonte.</span>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
            <span><strong className="text-[var(--color-text)]">API indisponível</strong> — Endpoint oficial desativado ou em migração. Dados reais usados como fallback estático.</span>
          </div>
        </div>
      </div>

      {/* Tabela por módulo */}
      <div className="space-y-6">
        {modulos.map((modulo) => {
          const fontesMod = fontes.filter((f) => f.modulo === modulo);
          return (
            <div key={modulo} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                <h3 className="font-semibold text-sm text-[var(--color-text)]">{modulo}</h3>
              </div>
              <div className="divide-y divide-[var(--color-border)]">
                {fontesMod.map((fonte, i) => {
                  const cfg = statusConfig[fonte.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={i} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-[var(--color-text)]">{fonte.indicador}</p>
                          <p className="text-xs text-[var(--color-muted)] mt-0.5">{fonte.fonte}</p>
                        </div>
                        <span className={`text-[10px] flex items-center gap-1 px-2 py-1 rounded-full border font-medium shrink-0 ${cfg.classes}`}>
                          <StatusIcon size={11} />
                          {cfg.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mt-3">
                        <div>
                          <p className="text-[var(--color-muted)] uppercase tracking-wide text-[10px] mb-0.5">Organização</p>
                          <p className="text-[var(--color-text)] font-medium">{fonte.organizacao}</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-muted)] uppercase tracking-wide text-[10px] mb-0.5">Última publicação</p>
                          <p className="text-[var(--color-text)] font-medium">{fonte.ultimaPublicacao}</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-muted)] uppercase tracking-wide text-[10px] mb-0.5">Periodicidade</p>
                          <p className="text-[var(--color-text)] font-medium">{fonte.periodicidade}</p>
                        </div>
                        <div>
                          <p className="text-[var(--color-muted)] uppercase tracking-wide text-[10px] mb-0.5">Fonte</p>
                          <a
                            href={fonte.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-saude)] hover:underline font-medium flex items-center gap-1"
                          >
                            Acessar <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>

                      <div className="mt-3 p-2 bg-[var(--color-bg)] rounded-lg text-[11px] text-[var(--color-muted)]">
                        <span className="font-medium text-[var(--color-text)]">
                          <RefreshCw size={10} className="inline mr-1" />
                          Método:
                        </span>{" "}
                        {fonte.metodo}
                        {fonte.observacao && (
                          <span className="block mt-1 text-amber-600">⚠ {fonte.observacao}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-muted)]">
        <p className="font-medium text-[var(--color-text)] mb-1">Sobre este painel</p>
        <p>
          Todas as fontes utilizadas são públicas, gratuitas e de organismos oficiais brasileiros (IBGE, Ministério da Saúde, MEC/INEP, Tesouro Nacional).
          Dados com API ao vivo são atualizados automaticamente a cada 30 dias. Dados estáticos devem ser revisados manualmente conforme a periodicidade indicada.
          Auditoria realizada em <strong>junho de 2026</strong>.
        </p>
      </div>
    </div>
  );
}
