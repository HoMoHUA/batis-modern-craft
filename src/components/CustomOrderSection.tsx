import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Ruler, Palette, TreeDeciduous } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("درخواست شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.");
    setFormData({
      name: "",
      phone: "",
      dimensions: "",
      woodType: "",
      color: "",
      description: "",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("سلام، می‌خواهم سفارش سفارشی ثبت کنم.");
    window.open(`https://wa.me/989123456789?text=${message}`, "_blank");
  };

  return (
    <section id="custom" className="py-20 bg-gradient-to-br from-primary to-steel">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded text-sm font-medium mb-6">
              سفارش سفارشی
            </span>
            <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary-foreground mb-6">
              محصول دلخواهتان را
              <br />
              <span className="text-ochre">سفارش دهید</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              ابعاد، نوع چوب و رنگ دلخواه خود را مشخص کنید. تیم ما طراحی و تولید
              محصول منحصربه‌فرد شما را انجام می‌دهد.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded flex items-center justify-center">
                  <Ruler className="w-6 h-6 text-ochre" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-foreground">ابعاد دلخواه</h4>
                  <p className="text-primary-foreground/70 text-sm">هر اندازه‌ای که نیاز دارید</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded flex items-center justify-center">
                  <TreeDeciduous className="w-6 h-6 text-ochre" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-foreground">انتخاب چوب</h4>
                  <p className="text-primary-foreground/70 text-sm">نراد، بلوط، گردو و...</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded flex items-center justify-center">
                  <Palette className="w-6 h-6 text-ochre" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-foreground">رنگ سفارشی</h4>
                  <p className="text-primary-foreground/70 text-sm">از پالت رنگی ما انتخاب کنید</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              variant="cta"
              size="lg"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              ارسال درخواست در واتساپ
            </Button>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card p-8 rounded-lg shadow-industrial"
            >
              <h3 className="text-xl font-industrial font-bold text-primary mb-6">
                فرم سفارش سفارشی
              </h3>

              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      نام و نام خانوادگی
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="نام شما"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      شماره تماس
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ابعاد (سانتیمتر)
                    </label>
                    <Input
                      value={formData.dimensions}
                      onChange={(e) =>
                        setFormData({ ...formData, dimensions: e.target.value })
                      }
                      placeholder="۱۲۰×۶۰×۷۵"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      نوع چوب
                    </label>
                    <Input
                      value={formData.woodType}
                      onChange={(e) =>
                        setFormData({ ...formData, woodType: e.target.value })
                      }
                      placeholder="نراد، بلوط..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      رنگ
                    </label>
                    <Input
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      placeholder="مشکی، گردویی..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    توضیحات بیشتر
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="جزئیات سفارش خود را بنویسید..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="industrial" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  ثبت درخواست
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;