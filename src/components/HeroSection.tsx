import { motion } from "framer-motion";
import { ArrowLeft, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workshop.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.1, 0.9, 0.2, 1] }}
          src={heroImage}
          alt="کارگاه تولید مبلمان"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/75 to-primary/50" />
        <div className="absolute inset-0 texture-metal" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mr-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
          >
            <span className="inline-block px-5 py-2.5 glass-dark rounded-full text-primary-foreground text-sm font-vazir font-medium mb-6">
              تولیدی مبلمان چوب و فلز
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-vazir-bold text-primary-foreground leading-tight mb-6"
          >
            استحکام فلز،
            <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
              className="text-ochre"
            >
              گرمای چوب؛
            </motion.span>
            <br />
            مستقیم از کارگاه به فضای شما
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
            className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl font-vazir leading-relaxed"
          >
            با حذف واسطه‌ها، مبلمان اداری و خانگی با کیفیت صنعتی و قیمت کارگاهی
            به دست شما می‌رسد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="cta" size="xl" className="group font-vazir">
                مشاهده قیمت و خرید آنلاین
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-vazir"
              >
                <Ruler className="w-5 h-5" />
                سفارش با ابعاد دلخواه
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.1, 0.9, 0.2, 1] }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { value: "+۵۰۰", label: "مشتری راضی" },
              { value: "۱۵+", label: "سال تجربه" },
              { value: "ضمانت", label: "مادام‌العمر جوشکاری" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="glass-dark px-6 py-4 rounded-xl"
              >
                <div className="text-2xl md:text-3xl font-vazir-bold text-ochre">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm font-vazir">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.1, 0.9, 0.2, 1] }}
          className="w-6 h-10 glass-dark rounded-full flex justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.1, 0.9, 0.2, 1] }}
            className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;