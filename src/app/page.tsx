import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import HighlightText from "@/components/HighlightText";
import WorkProcess from "@/components/WorkProcess";
import WhyChooseMe from "@/components/WhyChooseMe";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background font-sans">
      <HeroBanner />
      <HighlightText />
      <WorkProcess />
      <WhyChooseMe />
      <TechStack />
      <Works />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
}
