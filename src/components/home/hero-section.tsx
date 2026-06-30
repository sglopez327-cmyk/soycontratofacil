"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HeroLottie } from "./hero-lottie";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated mesh gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -left-[10%] top-[5%] h-[420px] w-[520px] rounded-full bg-brand-indigo/20 blur-[90px]"
          animate={{ x: [0, 50, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[5%] top-[15%] h-[380px] w-[480px] rounded-full bg-brand-emerald/15 blur-[90px]"
          animate={{ x: [0, -40, -15, 0], y: [0, -25, 35, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[30%] top-[40%] h-[300px] w-[400px] rounded-full bg-violet-300/20 blur-[100px]"
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 max-w-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-700/80 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-6 px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-20 lg:grid-cols-[1fr_auto] lg:gap-8 lg:pb-10 lg:pt-24">
        <div className="text-center lg:text-left">
          <motion.h1
            className="text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl"
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
          >
            Genera tu contrato de alquiler o compraventa legal{" "}
            <span className="bg-gradient-to-r from-brand-blue to-violet-400 bg-clip-text text-transparent">
              en minutos
            </span>{" "}
            y{" "}
            <span className="bg-gradient-to-r from-brand-emerald to-emerald-300 bg-clip-text font-bold text-transparent">
              gratis
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-xl text-card-body text-lg text-slate-400 sm:mt-10 sm:text-xl lg:mx-0"
            initial="hidden"
            animate="visible"
            custom={0.28}
            variants={fadeUp}
          >
            Documentos verificados, seguros y listos para firmar.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-center gap-4 sm:mt-14 lg:items-start"
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={fadeUp}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#arrendamientos"
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-blue px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)]"
              >
                Crear mi contrato gratis
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </motion.div>

            <p className="text-sm text-slate-400">
              Sin registro · Descarga en PDF ·{" "}
              <span className="font-medium text-brand-emerald">Normativa española</span>
            </p>
          </motion.div>
        </div>

        <HeroLottie />
      </div>
    </section>
  );
}
