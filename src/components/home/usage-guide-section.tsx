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
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Cómo funciona
          </p>
          <h2
            id="guia-de-uso-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Guía de uso
          </h2>
          <p className="text-card-body mt-3 text-sm text-slate-400 sm:text-base">
            Genera contratos legales en tres pasos. No necesitas crear una cuenta ni
            iniciar sesión.
          </p>
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
