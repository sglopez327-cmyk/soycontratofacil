"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Lock, Scale, Shield } from "lucide-react";

const signals = [
  {
    icon: Shield,
    title: "Plantillas orientadas a normativa española",
    text: "Los modelos se estructuran según el marco habitual de alquiler y compraventa en España. No son un dictamen jurídico personalizado.",
  },
  {
    icon: Lock,
    title: "Sin registro y sin guardar tu contrato",
    text: "Generas el PDF en tu navegador. No pedimos cuenta ni almacenamos el contenido de tus documentos en nuestros servidores.",
  },
  {
    icon: Scale,
    title: "Transparencia: no somos un despacho",
    text: "Somos una herramienta automatizada. Si tu caso es complejo o hay conflicto, conviene revisar el documento con un profesional.",
  },
  {
    icon: Eye,
    title: "Tú revisas antes de firmar",
    text: "El PDF es una base clara y editable en origen. La responsabilidad final de comprobar datos y cláusulas es siempre tuya.",
  },
] as const;

export function TrustSignalsSection() {
  return (
    <section
      id="confianza"
      className="scroll-anchor border-t border-slate-800/80 bg-[#0f172a] px-6 py-12 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="confianza-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand-blue sm:text-xs"
          >
            Confianza
          </motion.p>
          <motion.h2
            id="confianza-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Claridad antes que promesas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-card-body mx-auto mt-5 max-w-xl text-base text-slate-400"
          >
            Google y las personas valoran transparencia. Por eso explicamos qué
            somos, qué no somos y cómo tratamos tus datos.
          </motion.p>
        </div>

        <ul className="mt-10 space-y-6">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.li
                key={signal.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex gap-4"
              >
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {signal.title}
                  </h3>
                  <p className="text-card-body mt-1.5 text-sm text-slate-400 sm:text-base">
                    {signal.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 text-center text-sm text-slate-500"
        >
          Más detalle en{" "}
          <Link
            href="/sobre-nosotros"
            className="font-medium text-brand-blue hover:underline"
          >
            Sobre nosotros
          </Link>{" "}
          y en el{" "}
          <Link
            href="/aviso-legal"
            className="font-medium text-brand-blue hover:underline"
          >
            aviso legal
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}
