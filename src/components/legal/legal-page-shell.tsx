import Link from "next/link";
import type { ReactNode } from "react";

import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";

type LegalPageShellProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-slate-400 transition-colors hover:text-brand-blue"
        >
          ← Volver al inicio
        </Link>

        <header className="mb-10 border-b border-slate-700/80 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Información legal
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-card-body mt-4 text-base text-slate-400">{description}</p>
          <p className="mt-4 text-xs text-slate-500">
            Última actualización: {lastUpdated}
          </p>
        </header>

        <article className="space-y-10 text-justify">{children}</article>
      </main>
      <FooterDisclaimer />
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
        {title}
      </h2>
      <div className="text-card-body mt-4 space-y-4 text-sm text-slate-400 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
