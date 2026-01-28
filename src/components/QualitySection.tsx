import { motion } from "framer-motion";
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

const QualitySection = () => {
  return (
    <section id="quality" className="py-20 bg-background texture-metal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded text-sm font-medium mb-4">
            کالبدشکافی کیفیت
          </span>
          <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary mb-4">
            چه چیزی ما را <span className="text-accent">متفاوت</span> می‌کند؟
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            هر جزء محصولات ما با دقت انتخاب شده تا کیفیتی ماندگار تضمین شود
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded bg-card border border-border hover:border-accent transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded">
                  {feature.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-industrial font-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;