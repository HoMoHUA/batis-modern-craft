import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-workshop.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.7, 0.9]);

  // Staggered text animations
  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.8,
        ease: [0.1, 0.9, 0.2, 1] as const
      }
    })
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <motion.img
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.1, 0.9, 0.2, 1] }}
          src={heroImage}
          alt="کارگاه تولید مبلمان"
          className="w-full h-[130%] object-cover"
          style={{ scale: backgroundScale }}
        />
        
        {/* Dynamic Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-l from-primary via-primary/75 to-primary/40"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Metal Texture */}
        <div className="absolute inset-0 texture-metal opacity-30" />
        
        {/* Cinematic Bars */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
      </motion.div>

      {/* Content with fade on scroll */}
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

          {/* Main Headline - Cinematic Typography */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-azarmehr-bold text-primary-foreground leading-[1.1] mb-8"
          >
            <span className="block">استحکام فلز،</span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
              className="block text-ochre"
            >
              گرمای چوب؛
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.1, 0.9, 0.2, 1] }}
              className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-primary-foreground/90"
            >
              مستقیم از کارگاه به فضای شما
            </motion.span>
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
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.97 }}
            >
              <Button variant="cta" size="xl" className="group font-azarmehr text-lg px-10 py-7">
                مشاهده قیمت و خرید آنلاین
                <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-3" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-md font-azarmehr text-lg px-10 py-7"
              >
                <Ruler className="w-6 h-6" />
                سفارش با ابعاد دلخواه
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.1, 0.9, 0.2, 1] }}
            className="flex flex-wrap gap-6 mt-16"
          >
            {[
              { value: "+۵۰۰", label: "مشتری راضی" },
              { value: "۱۵+", label: "سال تجربه" },
              { value: "ضمانت", label: "مادام‌العمر جوشکاری" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.4 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="glass-dark px-8 py-5 rounded-[20px] border border-primary-foreground/10 cursor-default"
              >
                <div className="text-3xl md:text-4xl font-azarmehr-bold text-ochre">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm font-azarmehr mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.1, 0.9, 0.2, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-primary-foreground/50 text-sm font-azarmehr">اسکرول کنید</span>
          <div className="w-7 h-12 glass-dark rounded-[20px] flex justify-center p-2 border border-primary-foreground/10">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.1, 0.9, 0.2, 1] }}
              className="w-2 h-2 bg-ochre rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
