import { ContractCategories } from "@/components/home/contract-categories";
import { HeroSection } from "@/components/home/hero-section";
import { UsageGuideSection } from "@/components/home/usage-guide-section";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
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
