import {
  getPIBPerCapita,
  getPopulacaoEstimada,
  getIDEB,
  getPIBFallback,
  getPopulacaoFallback,
} from "@/lib/apis/ibge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");

  try {
    switch (tipo) {
      case "pib": {
        try {
          return Response.json(await getPIBPerCapita());
        } catch {
          return Response.json(getPIBFallback());
        }
      }
      case "populacao": {
        try {
          return Response.json(await getPopulacaoEstimada());
        } catch {
          return Response.json(getPopulacaoFallback());
        }
      }
      case "ideb":
        return Response.json(await getIDEB());
      default:
        return Response.json(
          { error: "Tipo inválido. Use: pib, populacao, ideb" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[IBGE API Error]", error);
    return Response.json({ error: "Falha ao buscar dados do IBGE" }, { status: 502 });
  }
}
