import { getPIBPerCapita, getPopulacaoEstimada, getIDEB } from "@/lib/apis/ibge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");

  try {
    switch (tipo) {
      case "pib":
        return Response.json(await getPIBPerCapita());
      case "populacao":
        return Response.json(await getPopulacaoEstimada());
      case "ideb":
        return Response.json(await getIDEB());
      default:
        return Response.json({ error: "Tipo inválido. Use: pib, populacao, ideb" }, { status: 400 });
    }
  } catch (error) {
    console.error("[IBGE API Error]", error);
    return Response.json({ error: "Falha ao buscar dados do IBGE" }, { status: 502 });
  }
}
