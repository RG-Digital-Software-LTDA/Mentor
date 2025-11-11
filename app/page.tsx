import { FrequentlyAskedQuestions } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SpotlightLogoCloud } from "@/components/logos-cloud";
import { ContactFormGridWithDetails } from "@/components/contact-form";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { BackgroundLines } from "@/components/ui/BackgroundLines";







export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <BackgroundLines />
      </div>
      <div className="relative z-10">
        <Hero />
        <SpotlightLogoCloud />
        <Features />
        <MacbookScroll />
        <FrequentlyAskedQuestions />
        <ContactFormGridWithDetails />
      </div>
    </div>
  );
}
