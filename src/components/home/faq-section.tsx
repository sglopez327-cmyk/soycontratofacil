"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import { homeFaqs } from "@/lib/seo-faq";

export function FaqSection() {
  return (
    <section
      id="preguntas-frecuentes"
      className="scroll-anchor border-t border-slate-800/80 bg-[#0f172a] px-6 py-12 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center rounded-full border border-brand-blue/30 bg-gradient-to-b from-brand-blue/15 to-brand-blue/5 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-blue sm:text-xs"
          >
            Preguntas frecuentes
          </motion.p>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Dudas habituales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-card-body mx-auto mt-5 max-w-xl text-base text-slate-400"
          >
            Respuestas rápidas sobre el generador de contratos. Para más detalle,
            consulta nuestras{" "}
            <Link href="/guias" className="text-brand-blue hover:underline">
              guías
            </Link>{" "}
            y{" "}
            <Link href="/articulos" className="text-brand-blue hover:underline">
              artículos
            </Link>
            .
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-10 divide-y divide-slate-700/80 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40"
        >
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-5 text-left transition-colors hover:bg-slate-800/60 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                  <HelpCircle className="size-4" aria-hidden />
                </span>
                <span className="flex-1 pr-2 text-sm font-semibold text-white sm:text-base">
                  {faq.question}
                </span>
              </summary>
              <div className="text-card-body border-t border-slate-700/50 px-5 pb-5 pl-16 text-sm text-slate-400 sm:px-6 sm:pb-6 sm:pl-[4.25rem] sm:text-base">
                {faq.answer}
              </div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
