import Hero from "@/ui/marketing/home/Hero";
import StatsBar from "@/ui/marketing/home/StatsBar";
import WhyUs from "@/ui/marketing/home/WhyUs";
import CourseCatalog from "@/ui/marketing/home/CourseCatalog";

import HowItWorks from "@/ui/marketing/home/HowItWorks";
import Instructors from "@/ui/marketing/home/Instructors";
import Testimonials from "@/ui/marketing/home/Testimonials";
import FinalCTA from "@/ui/marketing/home/FinalCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0e27] text-white">
      <Hero />
      <StatsBar />
      <WhyUs />
      <CourseCatalog />
    
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
