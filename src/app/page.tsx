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
  softwareApplicationSchema,
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
  title: "SoyContratoFacil.es — Contratos legales gratis en PDF",
  description:
    "Genera contratos de alquiler, compraventa y locales entre particulares. PDF legal, actualizado y listo para firmar. Gratis y sin registro.",
  path: "/",
});

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          homeFaqSchema(),
          softwareApplicationSchema(),
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
