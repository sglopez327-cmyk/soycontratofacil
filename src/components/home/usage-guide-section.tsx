"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, MousePointerClick } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Elige tu contrato",
    description:
      "Selecciona el tipo de documento que necesitas: alquiler, compraventa, arras o trámites complementarios.",
    mobileDescription:
      "Alquiler, compraventa, arras o trámites complementarios.",
    icon: MousePointerClick,
    href: "/#arrendamientos",
    cta: "Ver contratos",
  },
  {
    number: "02",
    title: "Completa el formulario",
    description:
      "Rellena los datos paso a paso. Solo te pedimos la información legal necesaria para tu contrato.",
    mobileDescription: "Solo los datos legales necesarios, paso a paso.",
    icon: FileText,
    href: "/generar/vivienda",
    cta: "Empezar formulario",
  },
  {
    number: "03",
    title: "Descarga tu PDF",
    description:
      "Genera y descarga el documento al instante. Sin registro, sin cuenta y totalmente gratis.",
    mobileDescription: "Al instante, sin registro ni cuenta y",
    icon: Download,
    href: "/generar/vivienda",
    cta: "Generar PDF gratis",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function StepDescription({
  step,
  compact = false,
}: {
  step: (typeof steps)[number];
  compact?: boolean;
}) {
  if (step.number === "03") {
    return (
      <p
        className={
          compact
            ? "text-card-body mt-0.5 text-xs leading-snug text-slate-400"
            : "text-card-body mt-2 text-sm text-slate-400"
        }
      >
        {compact ? (
          <>
            {step.mobileDescription}{" "}
            <span className="font-bold text-brand-emerald">gratis</span>.
          </>
        ) : (
          <>
            Genera y descarga el documento al instante. Sin registro, sin
            cuenta y totalmente{" "}
            <span className="font-bold text-brand-emerald">gratis</span>.
          </>
        )}
      </p>
    );
  }

  return (
    <p
      className={
        compact
          ? "text-card-body mt-0.5 text-xs leading-snug text-slate-400"
          : "text-card-body mt-2 text-sm text-slate-400"
      }
    >
      {compact ? step.mobileDescription : step.description}
    </p>
  );
}

export function UsageGuideSection() {
  return (
    <section
      id="guia-de-uso"
      className="scroll-anchor border-t border-slate-800/80 bg-[#0f172a] px-6 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:px-8 lg:pt-12 lg:pb-20"
      aria-labelledby="guia-de-uso-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto max-w-2xl text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-24 w-48 -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex items-center px-1 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-blue sm:text-xs"
          >
            ¿Cómo funciona?
          </motion.p>

          <motion.h2
            id="guia-de-uso-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 text-3xl font-bold tracking-tight text-white sm:mt-7 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
          >
            Guía de{" "}
            <span className="bg-gradient-to-r from-white via-slate-100 to-brand-blue bg-clip-text text-transparent">
              uso
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="text-card-body relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg"
          >
            Genera contratos legales en{" "}
            <span className="font-semibold text-slate-200">tres pasos</span>. No
            necesitas crear una cuenta ni iniciar sesión. Toca cada paso para
            continuar.
          </motion.p>
        </div>

        {/* Móvil: panel compacto con los 3 pasos enlazados */}
        <motion.ol
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 divide-y divide-slate-700/80 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 backdrop-blur-md sm:hidden"
        >
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <li key={step.number}>
                <Link
                  href={step.href}
                  className="flex items-start gap-3 p-3.5 transition-colors active:bg-slate-800/80"
                >
                  <div className="flex shrink-0 flex-col items-center gap-1.5">
                    <span className="text-[0.6rem] font-semibold tracking-widest text-brand-blue">
                      {step.number}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                      <Icon className="size-4" aria-hidden />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="flex items-center gap-1.5 text-sm font-bold leading-snug text-white">
                      {step.title}
                      <ArrowRight className="size-3.5 shrink-0 text-brand-blue" aria-hidden />
                    </h3>
                    <StepDescription step={step} compact />
                  </div>
                </Link>
              </li>
            );
          })}
        </motion.ol>

        {/* Escritorio: tarjetas enlazadas */}
        <ol className="mt-12 hidden gap-5 sm:grid sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.li
                key={step.number}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
              >
                <Link
                  href={step.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-800/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/50 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-brand-blue/10"
                >
                  <span className="text-xs font-semibold tracking-widest text-brand-blue">
                    PASO {step.number}
                  </span>
                  <span className="mt-4 flex size-11 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25 transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:ring-brand-blue">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-brand-blue">
                    {step.title}
                  </h3>
                  <StepDescription step={step} />
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                    {step.cta}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <Link
            href="/generar/vivienda"
            className="inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] sm:w-auto"
          >
            Crear mi contrato gratis
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
