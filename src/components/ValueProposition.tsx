import { motion } from "framer-motion";
import { Shield, Wallet, TreePine } from "lucide-react";

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

const ValueProposition = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary mb-4">
            چرا <span className="text-accent">باتیس مدرن؟</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ما با ترکیب هنر سنتی صنعتگری و تکنولوژی مدرن، محصولاتی می‌سازیم که
            سال‌ها کنار شما می‌مانند.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-background p-8 rounded border border-border hover:border-accent transition-all duration-300 hover:shadow-industrial"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-wood-light rounded flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-industrial font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;