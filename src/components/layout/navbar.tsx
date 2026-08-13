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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg transition-opacity duration-300 group-hover:opacity-90">
              <Image
                src="/brand/logo-mark-clean.svg"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-lg"
                priority
              />
            </span>
            <span className="truncate text-[0.95rem] font-semibold tracking-tight text-[#E2E8F0] transition-colors duration-300 group-hover:text-brand-blue">
              SoyContratoFacil
              <span className="text-slate-400 transition-colors duration-300 group-hover:text-brand-blue/70">
                .es
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 text-sm font-medium text-[#E2E8F0] lg:flex"
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
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link
            href={GUIDE_HREF}
            className={cn(
              "hidden h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-800/40 px-4 text-sm font-medium leading-none text-slate-200 transition-all duration-300 sm:inline-flex",
              "hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue"
            )}
          >
            <BookOpen className="size-4 shrink-0" aria-hidden />
            Guía de uso
          </Link>

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
