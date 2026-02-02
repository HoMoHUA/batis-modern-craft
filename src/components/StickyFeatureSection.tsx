import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import qualitySteel from "@/assets/quality-steel.jpg";
import qualityWeld from "@/assets/quality-weld.jpg";
import qualityWood from "@/assets/quality-wood.jpg";

const features = [
  {
    id: 1,
    title: "پروفیل فولادی ۲ میلی‌متر",
    subtitle: "استحکام بی‌نظیر",
    description: "استفاده از پروفیل‌های فولادی با ضخامت ۲ میلی‌متر که استحکام و دوام بی‌نظیری را تضمین می‌کند. هر اتصال با دقت میلی‌متری جوشکاری شده و تحت فشار تست می‌شود.",
    image: qualitySteel,
    stats: [
      { label: "ضخامت پروفیل", value: "۲mm" },
      { label: "تحمل وزن", value: "+۵۰۰kg" },
    ]
  },
  {
    id: 2,
    title: "رنگ کوره‌ای الکترواستاتیک",
    subtitle: "پوشش ماندگار",
    description: "فرآیند رنگ‌آمیزی الکترواستاتیک با پخت در کوره صنعتی، پوششی یکنواخت و بسیار مقاوم ایجاد می‌کند که تا ۱۵ سال بدون تغییر رنگ و خراش باقی می‌ماند.",
    image: qualityWeld,
    stats: [
      { label: "ماندگاری", value: "۱۵+ سال" },
      { label: "دمای پخت", value: "۲۰۰°C" },
    ]
  },
  {
    id: 3,
    title: "چوب نراد خشک‌شده",
    subtitle: "طبیعت در خانه شما",
    description: "چوب نراد با کیفیت که در کوره‌های صنعتی خشک شده و رطوبت آن به زیر ۱۲٪ رسیده است. این فرآیند از تاب‌خوردگی و ترک‌خوردگی جلوگیری کرده و عمر محصول را افزایش می‌دهد.",
    image: qualityWood,
    stats: [
      { label: "رطوبت نهایی", value: "<۱۲٪" },
      { label: "ضمانت", value: "مادام‌العمر" },
    ]
  }
];

const StickyFeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  return (
    <section 
      ref={containerRef}
      id="quality"
      className="relative bg-primary"
      style={{ height: `${features.length * 100}vh` }}
    >
      {/* Desktop: Sticky scroll */}
      <div className="sticky top-0 h-screen overflow-hidden hidden lg:flex">
        {/* Left - Sticky Image (RTL: appears on right) */}
        <div className="w-1/2 h-full relative">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [
                    index * 0.33 - 0.1,
                    index * 0.33,
                    (index + 1) * 0.33 - 0.1,
                    (index + 1) * 0.33
                  ],
                  [0, 1, 1, index === features.length - 1 ? 1 : 0]
                )
              }}
            >
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
                style={{
                  scale: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    [1.15, 1]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    [30, 0]
                  )
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/50 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Right - Content */}
        <div className="w-1/2 h-full flex flex-col justify-center relative px-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="absolute inset-0 flex flex-col justify-center px-16"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [
                    index * 0.33 - 0.05,
                    index * 0.33 + 0.05,
                    (index + 1) * 0.33 - 0.05,
                    (index + 1) * 0.33
                  ],
                  [0, 1, 1, index === features.length - 1 ? 1 : 0]
                ),
                y: useTransform(
                  scrollYProgress,
                  [index * 0.33 - 0.1, index * 0.33 + 0.1],
                  [80, 0]
                )
              }}
            >
              {/* Feature Number */}
              <motion.span 
                className="text-[120px] font-azarmehr-bold text-primary-foreground/10 mb-4 block leading-none"
                style={{
                  x: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    [-50, 0]
                  )
                }}
              >
                0{index + 1}
              </motion.span>

              {/* Content */}
              <span className="text-ochre text-sm font-azarmehr-medium mb-3 block">
                {feature.subtitle}
              </span>
              
              <h3 className="text-4xl lg:text-5xl font-azarmehr-bold text-primary-foreground mb-6 leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8 max-w-lg font-azarmehr">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="flex gap-6">
                {feature.stats.map((stat) => (
                  <div key={stat.label} className="glass-dark rounded-[20px] px-6 py-4">
                    <div className="text-2xl font-azarmehr-bold text-ochre">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/60 text-sm font-azarmehr">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Stacked sections with scroll animations */}
      <div className="lg:hidden">
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            className="min-h-screen flex flex-col relative"
          >
            {/* Image - fixed during scroll */}
            <div className="sticky top-0 h-[50vh] w-full overflow-hidden">
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-primary" />
              
              {/* Feature Number Overlay */}
              <div className="absolute bottom-4 right-4">
                <span className="text-7xl font-azarmehr-bold text-primary-foreground/20">
                  0{index + 1}
                </span>
              </div>
            </div>

            {/* Content - scrolls over image */}
            <motion.div 
              className="relative bg-primary px-6 py-10 -mt-20 rounded-t-[30px] z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-ochre text-sm font-azarmehr-medium mb-2 block">
                {feature.subtitle}
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-azarmehr-bold text-primary-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-primary-foreground/70 text-base leading-relaxed mb-6 font-azarmehr">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="flex gap-4">
                {feature.stats.map((stat) => (
                  <motion.div 
                    key={stat.label} 
                    className="glass-dark rounded-[20px] px-5 py-3 flex-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-xl font-azarmehr-bold text-ochre">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/60 text-xs font-azarmehr">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Progress Dots - RIGHT side for RTL */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {features.map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full border-2 border-primary-foreground/30"
            style={{
              backgroundColor: useTransform(
                activeIndex,
                [index - 0.5, index, index + 0.5],
                ["transparent", "hsl(var(--ochre))", "transparent"]
              )
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default StickyFeatureSection;
