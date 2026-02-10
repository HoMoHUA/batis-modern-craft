import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workshop.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Direct transforms without springs for better perf
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with simple parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImage}
          alt="کارگاه تولید مبلمان"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />

        {/* Static Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/75 to-primary/40 opacity-80" />

        {/* Cinematic Bars */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10 pt-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl mr-auto">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <span className="inline-block px-6 py-3 glass-dark rounded-[20px] text-primary-foreground text-sm font-azarmehr-medium mb-8 border border-primary-foreground/10">
              تولیدی مبلمان چوب و فلز
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-azarmehr-bold text-primary-foreground leading-[1.1] mb-8"
          >
            <span className="block">استحکام فلز،</span>
            <span className="block text-ochre">گرمای چوب؛</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-primary-foreground/90">
              مستقیم از کارگاه به فضای شما
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl font-azarmehr leading-relaxed"
          >
            با حذف واسطه‌ها، مبلمان اداری و خانگی با کیفیت صنعتی و قیمت کارگاهی
            به دست شما می‌رسد.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Button variant="cta" size="xl" className="group font-azarmehr text-lg px-10 py-7 hover:scale-105 transition-transform">
              مشاهده قیمت و خرید آنلاین
              <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-3" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-md font-azarmehr text-lg px-10 py-7 hover:scale-105 transition-transform"
            >
              <Ruler className="w-6 h-6" />
              سفارش با ابعاد دلخواه
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-wrap gap-6 mt-16"
          >
            {[
              { value: "+۵۰۰", label: "مشتری راضی" },
              { value: "۱۵+", label: "سال تجربه" },
              { value: "ضمانت", label: "مادام‌العمر جوشکاری" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-dark px-8 py-5 rounded-[20px] border border-primary-foreground/10 hover:scale-105 transition-transform cursor-default"
              >
                <div className="text-3xl md:text-4xl font-azarmehr-bold text-ochre">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm font-azarmehr mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-primary-foreground/50 text-sm font-azarmehr">اسکرول کنید</span>
          <div className="w-7 h-12 glass-dark rounded-[20px] flex justify-center p-2 border border-primary-foreground/10">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-ochre rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
