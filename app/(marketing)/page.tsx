import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import WhyUs from "@/components/home/WhyUs";
import CourseCatalog from "@/components/home/CourseCatalog";
import BrowseCategories from "@/components/home/BrowseCategories";
import HowItWorks from "@/components/home/HowItWorks";
import Instructors from "@/components/home/Instructors";
import Testimonials from "@/components/home/Testimonials";
import CurriculumPreview from "@/components/home/CurriculumPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0e27] text-white">
      <Hero />
      <StatsBar />
      <WhyUs />
      <CourseCatalog />
      <BrowseCategories />
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <CurriculumPreview />
      <FinalCTA />
    </main>
  );
}
