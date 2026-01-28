import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "علی محمدی",
    location: "تهران",
    rating: 5,
    text: "کیفیت جوشکاری و چوب عالی بود. قیمت هم نسبت به بازار خیلی مناسب‌تر بود. خیلی راضی هستم.",
    product: "میز مدیریت",
  },
  {
    id: 2,
    name: "سارا احمدی",
    location: "اصفهان",
    rating: 5,
    text: "سفارش سفارشی دادم و دقیقاً همون چیزی که می‌خواستم تحویل گرفتم. حرفه‌ای و دقیق.",
    product: "کتابخانه سفارشی",
  },
  {
    id: 3,
    name: "محمد رضایی",
    location: "شیراز",
    rating: 5,
    text: "بعد از ۲ سال هنوز مثل روز اول محکم و تمیزه. ضمانت مادام‌العمرشون واقعیه.",
    product: "شلف دیواری",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

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
            نظرات مشتریان
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-vazir-bold text-primary mb-4">
            مشتریان <span className="text-accent">راضی</span> ما
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-vazir">
            تجربه مشتریانی که از محصولات باتیس مدرن استفاده کرده‌اند
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.1, 0.9, 0.2, 1]
              }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl relative group hover:shadow-fluent-16 transition-all duration-300"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="absolute top-6 left-6"
              >
                <Quote className="w-12 h-12 text-accent/15 group-hover:text-accent/25 transition-colors" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <Star className="w-5 h-5 fill-ochre text-ochre" />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6 font-vazir relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <h4 className="font-vazir-bold text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground font-vazir">
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs glass text-accent px-4 py-2 rounded-full font-vazir">
                  {testimonial.product}
                </span>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-cta rounded-b-2xl"
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

export default TestimonialsSection;