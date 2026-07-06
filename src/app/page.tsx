import { ContractCategories } from "@/components/home/contract-categories";
import { HeroSection } from "@/components/home/hero-section";
import { UsageGuideSection } from "@/components/home/usage-guide-section";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/seo";
import { allContractItemListSchema, articlesItemListSchema, guidesItemListSchema, homeFaqSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: `${SITE_NAME} — Contratos inmobiliarios legales en minutos`,
  path: "/",
});

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd data={[homeFaqSchema(), allContractItemListSchema(), guidesItemListSchema(), articlesItemListSchema()]} />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <UsageGuideSection />
        <ContractCategories />
      </main>
      <FooterDisclaimer />
    </div>
  );
}
 