import { ContractCategories } from "@/components/home/contract-categories";
import { HeroSection } from "@/components/home/hero-section";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ContractCategories />
      </main>
      <FooterDisclaimer />
    </div>
  );
}
