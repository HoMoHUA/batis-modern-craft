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
      className="relative bg-primary"
      style={{ height: `${features.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {/* Left - Sticky Image */}
        <div className="w-1/2 h-full relative hidden lg:block">
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
                    [1.1, 1]
                  )
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/50 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Right - Scrolling Content */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="absolute w-full lg:w-1/2 px-8 lg:px-16"
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
                  [index * 0.33, index * 0.33 + 0.1],
                  [50, 0]
                )
              }}
            >
              {/* Feature Number */}
              <motion.span 
                className="text-8xl font-azarmehr-bold text-primary-foreground/10 mb-4 block"
              >
                0{index + 1}
              </motion.span>

              {/* Content */}
              <span className="text-ochre text-sm font-azarmehr-medium mb-2 block">
                {feature.subtitle}
              </span>
              
              <h3 className="text-3xl lg:text-5xl font-azarmehr-bold text-primary-foreground mb-6">
                {feature.title}
              </h3>
              
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8 max-w-lg font-azarmehr">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {feature.stats.map((stat) => (
                  <div key={stat.label} className="glass-dark rounded-xl px-6 py-4">
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

      {/* Progress Dots */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
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
