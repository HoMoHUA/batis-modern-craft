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
    <section id="quality" className="py-24 bg-background texture-metal relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-cta/10 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 glass-card text-accent rounded-full text-sm font-vazir font-medium mb-4"
          >
            کالبدشکافی کیفیت
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-vazir-bold text-primary mb-4">
            چه چیزی ما را <span className="text-accent">متفاوت</span> می‌کند؟
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-vazir">
            هر جزء محصولات ما با دقت انتخاب شده تا کیفیتی ماندگار تضمین شود
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {qualityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.1, 0.9, 0.2, 1] 
              }}
              className="group glass-card rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                
                {/* Badge */}
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute top-4 right-4 px-4 py-1.5 glass text-primary-foreground text-xs font-vazir font-medium rounded-full"
                >
                  {feature.badge}
                </motion.span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-vazir-bold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-vazir">
                  {feature.description}
                </p>
              </div>

              {/* Hover Accent Line */}
              <motion.div
                className="h-1 bg-gradient-to-r from-accent to-cta"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
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