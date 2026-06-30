"use client";

import { motion } from "framer-motion";
import { Download, FileText, MousePointerClick } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Elige tu contrato",
    description:
      "Selecciona el tipo de documento que necesitas: alquiler, compraventa, arras o trámites complementarios.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Completa el formulario",
    description:
      "Rellena los datos paso a paso. Solo te pedimos la información legal necesaria para tu contrato.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Descarga tu PDF",
    description:
      "Genera y descarga el documento al instante. Sin registro, sin cuenta y totalmente gratis.",
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

export function UsageGuideSection() {
  return (
    <section
      id="guia-de-uso"
      className="scroll-anchor border-t border-slate-800/80 bg-[#0f172a] px-6 py-16 lg:px-8 lg:py-20"
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

        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
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
                <p className="text-card-body mt-2 text-sm text-slate-400">
                  {step.number === "03" ? (
                    <>
                      Genera y descarga el documento al instante. Sin registro, sin
                      cuenta y totalmente{" "}
                      <span className="font-bold text-brand-emerald">gratis</span>.
                    </>
                  ) : (
                    step.description
                  )}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
