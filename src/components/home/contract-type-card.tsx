"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

const cardVariants = {
  rest: {},
  hover: {},
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.12,
    rotate: -5,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ContractTypeCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index?: number;
};

export function ContractTypeCard({
  title,
  description,
  href,
  icon: Icon,
  index = 0,
}: ContractTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="h-full"
    >
      <Link href={href} className="group block h-full">
        <motion.div
          className="relative h-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand-blue/50 hover:shadow-xl hover:shadow-brand-blue/10"
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
        >
          <div
            className="pointer-events-none absolute -right-1 -top-1 text-white opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]"
            aria-hidden
          >
            <ScrollText className="size-24 -rotate-12 sm:size-28" strokeWidth={1} />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-blue/[0.05] via-transparent to-brand-blue/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />

          <div className="relative flex h-full flex-col gap-4">
            <motion.span
              variants={iconVariants}
              className="flex size-12 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25 transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:ring-brand-blue"
            >
              <Icon className="size-5" aria-hidden />
            </motion.span>

            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-base font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue">
                {title}
              </h3>
              <p className="text-card-body text-sm text-slate-400">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-medium text-brand-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
              Generar documento
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
