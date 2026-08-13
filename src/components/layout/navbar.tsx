"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

const GUIDE_HREF = "/guia-de-uso";
const CREATE_HREF = "/generar/vivienda";

export function Navbar() {
  return (
    <motion.header
      className="sticky top-0 z-50 h-16 border-b border-slate-700/80 bg-[#0f172a]/90 backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 justify-self-start transition-opacity duration-300 hover:opacity-80"
        >
          <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            <Image
              src="/brand/logo-mark-clean.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-lg"
              priority
            />
          </span>
          <span className="truncate text-[0.95rem] font-semibold tracking-tight text-white">
            SoyContratoFacil
            <span className="text-slate-500">.es</span>
          </span>
        </Link>

        <Link
          href={CREATE_HREF}
          className="hidden justify-self-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue lg:block"
          aria-label="Crear contrato gratis"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-slate-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/10">
            <span className="text-white/95">Contratos legales</span>
            <span className="mx-2 text-brand-blue/50" aria-hidden>
              ·
            </span>
            <span>Sin registro</span>
            <span className="mx-2 text-brand-blue/50" aria-hidden>
              ·
            </span>
            <span className="font-bold text-brand-emerald">Gratis</span>
          </span>
        </Link>

        <div className="flex h-full items-center gap-2 justify-self-end sm:gap-3 lg:gap-5">
          <nav
            className="hidden items-center gap-5 text-sm text-slate-400 lg:flex"
            aria-label="Recursos"
          >
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
              href={GUIDE_HREF}
              className={cn(
                "inline-flex h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-800/40 px-4 text-sm font-medium leading-none text-slate-200 transition-all duration-300",
                "hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue"
              )}
            >
              <BookOpen className="size-4 shrink-0" aria-hidden />
              Guía de uso
            </Link>
          </nav>

          <Link
            href={CREATE_HREF}
            className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-full bg-brand-blue px-3.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(59,130,246,0.35)] transition-shadow hover:shadow-[0_4px_16px_rgba(59,130,246,0.45)] sm:px-4"
          >
            Crear contrato
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
