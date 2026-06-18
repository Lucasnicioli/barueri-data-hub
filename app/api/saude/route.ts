import {
  getEstabelecimentosSaude,
  getMortalidadeInfantilEstatica,
  getCoberturaVacinalEstatica,
  getInternacoesEstaticas,
} from "@/lib/apis/datasus";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");

  try {
    switch (tipo) {
      case "estabelecimentos":
        return Response.json(await getEstabelecimentosSaude());
      case "mortalidade":
        return Response.json(getMortalidadeInfantilEstatica());
      case "vacinacao":
        return Response.json(getCoberturaVacinalEstatica());
      case "internacoes":
        return Response.json(getInternacoesEstaticas());
      default:
        return Response.json(
          { error: "Tipo inválido. Use: estabelecimentos, mortalidade, vacinacao, internacoes" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Saúde API Error]", error);
    return Response.json({ error: "Falha ao buscar dados de saúde" }, { status: 502 });
  }
}
