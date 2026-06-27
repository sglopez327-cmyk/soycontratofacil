import { AlertTriangle } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function FooterDisclaimer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-200">
              <AlertTriangle className="size-5" aria-hidden />
            </span>
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-zinc-900">
                Aviso legal y responsabilidad del usuario
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600">
                ContratoFacil.es es una herramienta automatizada de generación de
                documentos contractuales. Los contratos generados se basan en
                plantillas actualizadas conforme a la normativa vigente, pero{" "}
                <strong className="font-medium text-zinc-800">
                  no constituyen asesoramiento legal personalizado
                </strong>
                .
              </p>
              <p className="text-sm leading-relaxed text-zinc-600">
                El usuario es el único responsable de revisar el documento
                generado, verificar que se ajusta a su situación particular y,
                en caso de duda, consultar con un abogado o asesor jurídico
                colegiado antes de firmar. La plataforma no sustituye el
                criterio profesional de un experto en derecho inmobiliario.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} ContratoFacil.es — Todos los derechos
            reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
            <a href="/privacidad" className="transition-colors hover:text-zinc-800">
              Privacidad
            </a>
            <a href="/terminos" className="transition-colors hover:text-zinc-800">
              Términos de uso
            </a>
            <a href="/cookies" className="transition-colors hover:text-zinc-800">
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
