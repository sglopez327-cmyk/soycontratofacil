import dynamic from "next/dynamic";

import { HeroSection } from "@/components/home/hero-section";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import {
  allContractItemListSchema,
  articlesItemListSchema,
  guidesItemListSchema,
  homeFaqSchema,
} from "@/lib/seo-schema";

const UsageGuideSection = dynamic(
  () =>
    import("@/components/home/usage-guide-section").then(
      (mod) => mod.UsageGuideSection
    ),
  { loading: () => <div className="min-h-[320px]" aria-hidden /> }
);

const ContractCategories = dynamic(
  () =>
    import("@/components/home/contract-categories").then(
      (mod) => mod.ContractCategories
    ),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> }
);

const FaqSection = dynamic(
  () =>
    import("@/components/home/faq-section").then((mod) => mod.FaqSection),
  { loading: () => <div className="min-h-[320px]" aria-hidden /> }
);

export const metadata = createPageMetadata({
  title: "Contrato Alquiler PDF Gratis 2026 | Descarga Fácil",
  description:
    "Genera contratos legales actualizados 2026 en minutos. PDF listo para imprimir. Gratis, sin registro. Empieza ahora.",
  path: "/",
});

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          homeFaqSchema(),
          allContractItemListSchema(),
          guidesItemListSchema(),
          articlesItemListSchema(),
        ]}
      />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <UsageGuideSection />
        <ContractCategories />
        <FaqSection />
      </main>
      <FooterDisclaimer />
    </div>
  );
}
