import Link from "next/link";
import { Scale } from "lucide-react";

import { CONTACT_EMAIL } from "@/lib/site-config";

export function FooterDisclaimer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-700/80 bg-[#0f172a]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(59,130,246,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8 shadow-lg backdrop-blur-md sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <Link
              href="/aviso-legal"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25 transition-colors hover:bg-brand-blue hover:text-white hover:ring-brand-blue"
              aria-label="Ir al aviso legal completo"
            >
              <Scale className="size-5" aria-hidden />
            </Link>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Transparencia
                </p>
                <h2 className="mt-1.5 text-base font-bold tracking-tight text-white">
                  Herramienta automatizada, no despacho de abogados
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-400">
                <p>
                  SoyContratoFacil.es genera documentos contractuales a partir
                  de plantillas orientadas a la normativa española.{" "}
                  <span className="font-medium text-slate-200">
                    No constituye asesoramiento legal personalizado
                  </span>{" "}
                  ni sustituye la revisión de un profesional colegiado.
                </p>
                <p>
                  El usuario es responsable de revisar el PDF, comprobar que
                  refleja su acuerdo y consultar a un abogado o asesor si tiene
                  dudas antes de firmar.
                </p>
                <p className="flex flex-wrap gap-x-4 gap-y-2">
                  <Link
                    href="/sobre-nosotros"
                    className="font-medium text-brand-blue hover:underline"
                  >
                    Sobre nosotros
                  </Link>
                  <Link
                    href="/aviso-legal"
                    className="font-medium text-brand-blue hover:underline"
                  >
                    Aviso legal completo
                  </Link>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-brand-blue hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-slate-700/80 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SoyContratoFacil.es — Todos los
            derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <Link
              href="/sobre-nosotros"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/guias"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Guías
            </Link>
            <Link
              href="/articulos"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Artículos
            </Link>
            <Link
              href="/aviso-legal"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Aviso legal
            </Link>
            <Link
              href="/privacidad"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos-de-uso"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Términos de uso
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-300 hover:text-brand-blue"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
