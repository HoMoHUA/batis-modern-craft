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
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded text-sm font-medium mb-4">
            نظرات مشتریان
          </span>
          <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary mb-4">
            مشتریان <span className="text-accent">راضی</span> ما
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تجربه مشتریانی که از محصولات باتیس مدرن استفاده کرده‌اند
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-background p-8 rounded border border-border relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 left-6 w-10 h-10 text-accent/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-ochre text-ochre"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <h4 className="font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded">
                  {testimonial.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;