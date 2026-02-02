import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Ruler, Palette, TreeDeciduous, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CustomOrderSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dimensions: "",
    woodType: "",
    color: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("درخواست شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.");
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        dimensions: "",
        woodType: "",
        color: "",
        description: "",
      });
    }, 3000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("سلام، می‌خواهم سفارش سفارشی ثبت کنم.");
    window.open(`https://wa.me/989123456789?text=${message}`, "_blank");
  };

  const features = [
    { icon: Ruler, title: "ابعاد دلخواه", desc: "هر اندازه‌ای که نیاز دارید" },
    { icon: TreeDeciduous, title: "انتخاب چوب", desc: "نراد، بلوط، گردو و..." },
    { icon: Palette, title: "رنگ سفارشی", desc: "از پالت رنگی ما انتخاب کنید" },
  ];

  return (
    <section id="custom" className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-steel to-primary" />
      <div className="absolute inset-0 texture-metal opacity-50" />

      {/* Decorative blurs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cta/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 glass-dark text-primary-foreground rounded-[20px] text-sm font-azarmehr font-medium mb-6"
            >
              سفارش سفارشی
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-azarmehr-bold text-primary-foreground mb-6">
              محصول دلخواهتان را
              <br />
              <span className="text-ochre">سفارش دهید</span>
            </h2>
            <p className="text-primary-foreground/85 text-lg mb-8 leading-relaxed font-azarmehr">
              ابعاد، نوع چوب و رنگ دلخواه خود را مشخص کنید. تیم ما طراحی و تولید
              محصول منحصربه‌فرد شما را انجام می‌دهد.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 glass-dark rounded-[20px] flex items-center justify-center group-hover:shadow-fluent-16 transition-shadow"
                  >
                    <feature.icon className="w-7 h-7 text-ochre" />
                  </motion.div>
                  <div>
                    <h4 className="font-azarmehr-bold text-primary-foreground">{feature.title}</h4>
                    <p className="text-primary-foreground/70 text-sm font-azarmehr">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="cta"
                size="lg"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto font-azarmehr"
              >
                <MessageCircle className="w-5 h-5" />
                ارسال درخواست در واتساپ
              </Button>
            </motion.div>
          </motion.div>

          {/* Form - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-[20px] shadow-fluent-64"
            >
              <h3 className="text-xl font-azarmehr-bold text-primary mb-6">
                فرم سفارش سفارشی
              </h3>

              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="نام شما"
                      required
                      className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                      شماره تماس
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      required
                      className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                      ابعاد (سانتیمتر)
                    </label>
                    <Input
                      value={formData.dimensions}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                      placeholder="۱۲۰×۶۰×۷۵"
                      className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                      نوع چوب
                    </label>
                    <Input
                      value={formData.woodType}
                      onChange={(e) =>
                        setFormData({ ...formData, woodType: e.target.value })
                      }
                      placeholder="نراد، بلوط..."
                      className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                      رنگ
                    </label>
                    <Input
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      placeholder="مشکی، گردویی..."
                      className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-azarmehr font-medium text-foreground mb-2">
                    توضیحات بیشتر
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="جزئیات سفارش خود را بنویسید..."
                    rows={4}
                    className="font-azarmehr glass border-border/50 focus:border-accent rounded-[20px]"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="industrial"
                    size="lg"
                    className="w-full font-azarmehr"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        ثبت شد!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        ثبت درخواست
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
