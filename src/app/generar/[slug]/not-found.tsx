import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";

export default function GenerarNotFound() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <Navbar />
      <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Contrato no encontrado</h1>
        <p className="mt-3 text-sm text-slate-400">
          El tipo de contrato que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
        >
          Volver al inicio
        </Link>
      </main>
    </div>
  );
}
