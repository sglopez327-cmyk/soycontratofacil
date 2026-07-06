import { notifyIndexNow } from "@/lib/indexnow";

/** Endpoint para notificar IndexNow tras despliegue (protegido por secreto). */
export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SECRET;
  const auth = request.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const ok = await notifyIndexNow();
    return Response.json({ ok, message: ok ? "URLs notificadas" : "Sin respuesta" });
  } catch {
    return Response.json({ ok: false, message: "Error al notificar" }, { status: 500 });
  }
}
