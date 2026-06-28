"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { contractCategories } from "@/lib/contracts";

import { ContractTypeCard } from "./contract-type-card";
import { SectionDivider } from "./section-divider";

const sectionFade = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContractCategories() {
  let cardIndex = 0;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-6 max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={sectionFade}
      >
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Elige tu tipo de{" "}
          <span className="text-brand-blue">contrato</span>
        </h2>
        <p className="text-card-body mt-2 text-sm text-slate-400 sm:text-base">
          Selecciona el documento que necesitas y accede al asistente de
          generación en un clic.
        </p>
      </motion.div>

      {contractCategories.map((category, categoryIndex) => (
        <Fragment key={category.id}>
          {categoryIndex > 0 && <SectionDivider />}

          <motion.div
            className={categoryIndex === 0 ? "pb-8 pt-0" : "py-8"}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionFade}
          >
            <div id={category.id} className="scroll-anchor mb-5">
              <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {category.description}
              </p>
            </div>

            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
              role="list"
            >
              {category.contracts.map((contract) => {
                const currentIndex = cardIndex++;
                return (
                  <div key={contract.slug} role="listitem">
                    <ContractTypeCard
                      title={contract.title}
                      description={contract.description}
                      href={contract.href}
                      icon={contract.icon}
                      index={currentIndex}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Fragment>
      ))}
    </section>
  );
}
