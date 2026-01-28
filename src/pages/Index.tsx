import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import QualitySection from "@/components/QualitySection";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import CustomOrderSection from "@/components/CustomOrderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <QualitySection />
        <ProductsSection />
        <GallerySection />
        <CustomOrderSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;