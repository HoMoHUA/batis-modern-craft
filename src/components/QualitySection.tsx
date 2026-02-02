import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import qualityWeld from "@/assets/quality-weld.jpg";
import qualityWood from "@/assets/quality-wood.jpg";
import qualitySteel from "@/assets/quality-steel.jpg";

const qualityFeatures = [
  {
    image: qualitySteel,
    title: "پروفیل ضخیم ۲ میل",
    description: "استفاده از پروفیل فولادی با ضخامت ۲ میلی‌متر برای استحکام بی‌نظیر",
    badge: "فولاد درجه یک",
  },
  {
    image: qualityWeld,
    title: "رنگ کوره‌ای الکترواستاتیک",
    description: "پوشش رنگ الکترواستاتیک پخت کوره‌ای با دوام ۱۵+ سال بدون تغییر رنگ",
    badge: "ضد خش و زنگ",
  },
  {
    image: qualityWood,
    title: "چوب نراد خشک",
    description: "چوب نراد با رطوبت کنترل شده و خشک‌کاری صنعتی برای جلوگیری از تاب‌خوردگی",
    badge: "۱۰۰٪ طبیعی",
  },
];

// Scroll-triggered 3D card variants
const cardVariants = {
  hidden: (i: number) => ({ 
    opacity: 0, 
    y: 80,
    rotateX: 25,
    rotateY: i % 2 === 0 ? -15 : 15,
    scale: 0.85
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.9,
      ease: [0.1, 0.9, 0.2, 1] as const
    }
  })
};

const QualitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax for decorative elements
  const decorY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section 
      ref={sectionRef}
      id="quality" 
      className="py-32 bg-background texture-metal relative overflow-hidden"
    >
      {/* Animated decorative elements */}
      <motion.div 
        style={{ y: decorY1, rotate: decorRotate }}
        className="absolute top-20 right-10 w-40 h-40 border-2 border-accent/20 rounded-full"
      />
      <motion.div 
        style={{ y: decorY2 }}
        className="absolute bottom-20 left-10 w-60 h-60 bg-cta/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -150]) }}
        className="absolute top-1/2 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
      />

      <div className="container mx-auto px-4 relative">
        {/* Header with scroll-triggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-block px-6 py-2.5 glass-card text-accent rounded-[20px] text-sm font-azarmehr-medium mb-6"
          >
            کالبدشکافی کیفیت
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-5xl font-azarmehr-bold text-primary mb-6"
          >
            چه چیزی ما را <span className="text-accent">متفاوت</span> می‌کند؟
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-muted-foreground max-w-2xl mx-auto font-azarmehr text-lg"
          >
            هر جزء محصولات ما با دقت انتخاب شده تا کیفیتی ماندگار تضمین شود
          </motion.p>
        </motion.div>

        {/* 3D Cards Grid with scroll reveal */}
        <div 
          className="grid md:grid-cols-3 gap-10"
          style={{ perspective: 1200 }}
        >
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                rotateX: -5,
                scale: 1.03,
                transition: { duration: 0.4 }
              }}
              className="group glass-card rounded-[20px] overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image with zoom on scroll */}
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.1, 0.9, 0.2, 1] }}
                  whileHover={{ scale: 1.15 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                
                {/* Floating Badge */}
                <motion.span
                  initial={{ opacity: 0, x: 30, y: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  className="absolute top-4 right-4 px-5 py-2 glass text-primary-foreground text-xs font-azarmehr-medium rounded-[20px] shadow-fluent-8"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {feature.badge}
                </motion.span>

                {/* 3D Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ transform: "translateZ(10px)" }}
                />
              </div>

              {/* Content with 3D depth */}
              <motion.div 
                className="p-7"
                style={{ transform: "translateZ(20px)" }}
              >
                <h3 className="text-xl font-azarmehr-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-azarmehr">
                  {feature.description}
                </p>
              </motion.div>

              {/* Animated accent line */}
              <motion.div
                className="h-1.5 bg-gradient-to-r from-accent to-cta"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0.3 }}
                whileHover={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
                style={{ originX: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
