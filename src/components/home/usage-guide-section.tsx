"use client";

import { motion } from "framer-motion";
import { Download, FileText, MousePointerClick } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Elige tu contrato",
    description:
      "Selecciona el tipo de documento que necesitas: alquiler, compraventa, arras o trámites complementarios.",
    mobileDescription:
      "Alquiler, compraventa, arras o trámites complementarios.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Completa el formulario",
    description:
      "Rellena los datos paso a paso. Solo te pedimos la información legal necesaria para tu contrato.",
    mobileDescription: "Solo los datos legales necesarios, paso a paso.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Descarga tu PDF",
    description:
      "Genera y descarga el documento al instante. Sin registro, sin cuenta y totalmente gratis.",
    mobileDescription: "Al instante, sin registro ni cuenta y",
    icon: Download,
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
            className="relative inline-flex items-center rounded-full border border-brand-blue/30 bg-gradient-to-b from-brand-blue/15 to-brand-blue/5 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-blue shadow-[inset_0_1px_0_0_rgba(59,130,246,0.2)] sm:text-xs"
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
            necesitas crear una cuenta ni iniciar sesión.
          </motion.p>
        </div>

        {/* Móvil: panel compacto con los 3 pasos en filas */}
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
              <li key={step.number} className="flex items-start gap-3 p-3.5">
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <span className="text-[0.6rem] font-semibold tracking-widest text-brand-blue">
                    {step.number}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                    <Icon className="size-4" aria-hidden />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-sm font-bold leading-snug text-white">
                    {step.title}
                  </h3>
                  <StepDescription step={step} compact />
                </div>
              </li>
            );
          })}
        </motion.ol>

        {/* Escritorio: tarjetas en 3 columnas */}
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
                className="relative rounded-2xl border border-slate-700 bg-slate-800/40 p-6 backdrop-blur-md"
              >
                <span className="text-xs font-semibold tracking-widest text-brand-blue">
                  PASO {step.number}
                </span>
                <span className="mt-4 flex size-11 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                <StepDescription step={step} />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
