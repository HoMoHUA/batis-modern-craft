import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

const Footer = () => {
  const currentYear = "۱۴۰۴";

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-[20px] flex items-center justify-center shadow-fluent-8"
              >
                <span className="text-accent-foreground font-azarmehr-bold text-xl">ص</span>
              </motion.div>
              <span className="font-azarmehr-bold text-2xl">
                صنایع مدرن
              </span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 font-azarmehr">
              تولیدکننده مبلمان چوب و فلز با کیفیت صنعتی. استحکام فلز، گرمای
              چوب؛ مستقیم از کارگاه به فضای شما.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Send, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 glass-dark rounded-[20px] flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-azarmehr-bold text-lg mb-6">
              دسترسی سریع
            </h4>
            <ul className="space-y-3">
              {["صفحه اصلی", "محصولات", "سفارش سفارشی", "درباره ما", "تماس با ما"].map(
                (link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-ochre transition-colors font-azarmehr link-underline inline-block"
                    >
                      {link}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-azarmehr-bold text-lg mb-6">
              دسته‌بندی محصولات
            </h4>
            <ul className="space-y-3">
              {["مبلمان اداری", "شلف و کتابخانه", "میز تحریر", "صندلی", "میز جلو مبلی"].map(
                (cat, index) => (
                  <motion.li
                    key={cat}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-ochre transition-colors font-azarmehr link-underline inline-block"
                    >
                      {cat}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-azarmehr-bold text-lg mb-6">
              ارتباط با ما
            </h4>
            <ul className="space-y-5">
              {[
                { icon: Phone, label: "تلفن تماس", value: "۰۹۱۲۳۴۵۶۷۸۹", href: "tel:+989123456789" },
                { icon: Mail, label: "ایمیل", value: "info@batismodern.ir", href: "mailto:info@batismodern.ir" },
                { icon: MapPin, label: "آدرس کارگاه", value: "تهران، شهرک صنعتی خاوران", href: null },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 glass-dark rounded-[20px] flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-ochre" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/60 text-sm font-azarmehr">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-azarmehr font-medium hover:text-ochre transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-azarmehr font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-primary-foreground/60 text-sm font-azarmehr">
              © {currentYear} صنایع مدرن. تمامی حقوق محفوظ است.
            </p>
            <p className="text-primary-foreground/60 text-sm font-azarmehr">
              طراحی و توسعه توسط{" "}
              <a href="#" className="text-ochre hover:underline font-medium">
                NeXTPixel
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
