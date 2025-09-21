import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Categories } from "@/components/home/Categories";
import { AIFeatures } from "@/components/home/AIFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Categories />
        <FeaturedProducts />
        <AIFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
