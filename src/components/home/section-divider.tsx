"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      className="py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      aria-hidden
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />
    </motion.div>
  );
}
