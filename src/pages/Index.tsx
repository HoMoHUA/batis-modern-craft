import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import StickyFeatureSection from "@/components/StickyFeatureSection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import CustomOrderSection from "@/components/CustomOrderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import NeXTPixelBadge from "@/components/NeXTPixelBadge";
import Preloader from "@/components/Preloader";
import AIChatBot from "@/components/AIChatBot";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen">
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <ValueProposition />
          <StickyFeatureSection />
          <ProductsSection />
          <GallerySection />
          <CustomOrderSection />
          <TestimonialsSection />
        </main>
        <Footer />
        <NeXTPixelBadge />
        <AIChatBot />
      </div>
    </>
  );
};

export default Index;