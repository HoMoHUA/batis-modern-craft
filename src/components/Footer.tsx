import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-wood-light rounded flex items-center justify-center">
                <span className="text-accent-foreground font-industrial text-xl font-bold">B</span>
              </div>
              <span className="font-industrial text-2xl font-bold">
                باتیس مدرن
              </span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              تولیدکننده مبلمان چوب و فلز با کیفیت صنعتی. استحکام فلز، گرمای
              چوب؛ مستقیم از کارگاه به فضای شما.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-industrial font-bold text-lg mb-6">
              دسترسی سریع
            </h4>
            <ul className="space-y-3">
              {["صفحه اصلی", "محصولات", "سفارش سفارشی", "درباره ما", "تماس با ما"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-ochre transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-industrial font-bold text-lg mb-6">
              دسته‌بندی محصولات
            </h4>
            <ul className="space-y-3">
              {["مبلمان اداری", "شلف و کتابخانه", "میز تحریر", "صندلی", "میز جلو مبلی"].map(
                (cat) => (
                  <li key={cat}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-ochre transition-colors"
                    >
                      {cat}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-industrial font-bold text-lg mb-6">
              ارتباط با ما
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-ochre mt-1" />
                <div>
                  <p className="text-primary-foreground/70 text-sm">تلفن تماس</p>
                  <a href="tel:+989123456789" className="font-medium hover:text-ochre transition-colors">
                    ۰۹۱۲۳۴۵۶۷۸۹
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-ochre mt-1" />
                <div>
                  <p className="text-primary-foreground/70 text-sm">ایمیل</p>
                  <a href="mailto:info@batismodern.ir" className="font-medium hover:text-ochre transition-colors">
                    info@batismodern.ir
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ochre mt-1" />
                <div>
                  <p className="text-primary-foreground/70 text-sm">آدرس کارگاه</p>
                  <p className="font-medium">
                    تهران، شهرک صنعتی خاوران
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © ۱۴۰۴ باتیس مدرن. تمامی حقوق محفوظ است.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              طراحی و توسعه توسط{" "}
              <a href="#" className="text-ochre hover:underline">
                NeXTPixel
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;