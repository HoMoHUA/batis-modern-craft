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
        <img
          src={heroImage}
          alt="کارگاه تولید مبلمان"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 texture-metal" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mr-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 rounded text-accent-foreground text-sm font-medium mb-6">
              تولیدی مبلمان چوب و فلز
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-industrial font-bold text-primary-foreground leading-tight mb-6"
          >
            استحکام فلز،
            <br />
            <span className="text-ochre">گرمای چوب؛</span>
            <br />
            مستقیم از کارگاه به فضای شما
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl"
          >
            با حذف واسطه‌ها، مبلمان اداری و خانگی با کیفیت صنعتی و قیمت کارگاهی
            به دست شما می‌رسد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="cta" size="xl" className="group">
              مشاهده قیمت و خرید آنلاین
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Ruler className="w-5 h-5" />
              سفارش با ابعاد دلخواه
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
          >
            <div>
              <div className="text-3xl md:text-4xl font-industrial font-bold text-ochre">
                +۵۰۰
              </div>
              <div className="text-primary-foreground/70 text-sm">مشتری راضی</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-industrial font-bold text-ochre">
                ۱۵+
              </div>
              <div className="text-primary-foreground/70 text-sm">سال تجربه</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-industrial font-bold text-ochre">
                ضمانت
              </div>
              <div className="text-primary-foreground/70 text-sm">مادام‌العمر جوشکاری</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;