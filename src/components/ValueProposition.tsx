import { motion, type Variants } from "framer-motion";
import { Shield, Wallet, TreePine } from "lucide-react";
import FluentRevealCard from "./FluentRevealCard";

const features = [
  {
    icon: Shield,
    title: "ضمانت مادام‌العمر",
    description: "جوشکاری حرفه‌ای با ضمانت بدون قید و شرط برای تمام عمر",
  },
  {
    icon: Wallet,
    title: "قیمت رقابتی",
    description: "حذف واسطه‌ها و فروش مستقیم از کارگاه با بهترین قیمت",
  },
  {
    icon: TreePine,
    title: "چوب درجه یک",
    description: "استفاده از چوب نراد خشک شده با بهترین کیفیت بازار",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.1, 0.9, 0.2, 1] as const,
    },
  },
};

const ValueProposition = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-azarmehr-bold text-primary mb-4">
            چرا <span className="text-accent">صنایع مدرن؟</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-azarmehr">
            ما با ترکیب هنر سنتی صنعتگری و تکنولوژی مدرن، محصولاتی می‌سازیم که
            سال‌ها کنار شما می‌مانند.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
            >
              <FluentRevealCard 
                className="h-full"
                lightColor="rgba(139, 69, 19, 0.15)"
              >
                <div className="glass-card p-8 rounded-[20px] hover-lift cursor-pointer h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-16 h-16 bg-gradient-to-br from-accent to-wood-light rounded-[20px] flex items-center justify-center mb-6 shadow-fluent-8"
                  >
                    <feature.icon className="w-8 h-8 text-accent-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-azarmehr-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-azarmehr">
                    {feature.description}
                  </p>
                  
                  {/* Hover accent line */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-accent to-cta rounded-full mt-6"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
                    style={{ originX: 1 }}
                  />
                </div>
              </FluentRevealCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
