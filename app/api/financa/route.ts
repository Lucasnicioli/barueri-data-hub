import { getFinancasEstaticas, getDespesaPorFuncaoEstatica } from "@/lib/apis/siconfi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");

  try {
    switch (tipo) {
      case "receitas":
        return Response.json(getFinancasEstaticas());
      case "despesas":
        return Response.json(getDespesaPorFuncaoEstatica());
      default:
        return Response.json({ error: "Tipo inválido. Use: receitas, despesas" }, { status: 400 });
    }
  } catch (error) {
    console.error("[Finanças API Error]", error);
    return Response.json({ error: "Falha ao buscar dados financeiros" }, { status: 502 });
  }
}
