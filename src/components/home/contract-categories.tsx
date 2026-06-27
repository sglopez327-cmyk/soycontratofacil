import { contractCategories } from "@/lib/contracts";

import { ContractTypeCard } from "./contract-type-card";

export function ContractCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Elige tu tipo de contrato
        </h2>
        <p className="mt-3 text-base text-zinc-600">
          Selecciona la categoría y el documento que necesitas. En un solo clic
          accederás al asistente de generación.
        </p>
      </div>

      <div className="space-y-14">
        {contractCategories.map((category) => (
          <div key={category.id} id={category.id}>
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-zinc-900">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {category.description}
                </p>
              </div>
              <span className="mt-2 text-sm font-medium text-zinc-400 sm:mt-0">
                {category.contracts.length} documentos
              </span>
            </div>

            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {category.contracts.map((contract) => (
                <div key={contract.id} role="listitem">
                  <ContractTypeCard
                    title={contract.title}
                    description={contract.description}
                    href={contract.href}
                    icon={contract.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
