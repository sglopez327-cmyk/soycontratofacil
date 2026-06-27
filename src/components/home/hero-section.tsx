import { ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200/40 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 border border-zinc-200 bg-white px-3 py-1 text-zinc-600 shadow-sm"
          >
            <Sparkles className="size-3.5" aria-hidden />
            Plataforma legal inmobiliaria
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Genera tu contrato de alquiler o compraventa legal en minutos
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
            Documentos verificados, seguros y listos para firmar
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
              Cumple normativa española
            </span>
            <span className="hidden h-4 w-px bg-zinc-300 sm:block" aria-hidden />
            <span>Descarga en PDF</span>
            <span className="hidden h-4 w-px bg-zinc-300 sm:block" aria-hidden />
            <span>Sin registro para empezar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
