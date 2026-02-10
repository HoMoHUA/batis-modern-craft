import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  ArrowRight, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Shield, 
  Truck, 
  RotateCcw,
  Check,
  Ruler,
  Palette,
  TreeDeciduous,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AIChatBot from "@/components/AIChatBot";

import productChair from "@/assets/product-chair.jpg";
import productDesk from "@/assets/product-desk.jpg";
import productShelf from "@/assets/product-shelf.jpg";

// Product data
const products = [
  {
    id: "1",
    name: "میز مدیریت اجرایی",
    subtitle: "طراحی مدرن و مینیمال",
    price: "۱۲,۵۰۰,۰۰۰",
    originalPrice: "۱۴,۰۰۰,۰۰۰",
    discount: 11,
    images: [productDesk, productChair, productShelf],
    description: "میز مدیریت اجرایی با طراحی مدرن و مینیمال، ترکیبی از چوب نراد خشک‌شده و پروفیل فولادی ۲ میلی‌متر. این میز با دقت میلی‌متری ساخته شده و ضمانت مادام‌العمر جوشکاری دارد.",
    longDescription: `میز مدیریت اجرایی صنایع مدرن یک شاهکار در طراحی صنعتی است. این محصول با ترکیب منحصربه‌فرد چوب نراد خشک‌شده در کوره‌های صنعتی و پروفیل فولادی با ضخامت ۲ میلی‌متر ساخته شده است.

هر اتصال جوشکاری این میز با دقت میلی‌متری انجام شده و تحت آزمایش‌های فشار و کشش قرار گرفته است. رنگ کوره‌ای الکترواستاتیک که در دمای ۲۰۰ درجه سانتی‌گراد پخته می‌شود، پوششی یکنواخت و بسیار مقاوم ایجاد می‌کند.

این میز مناسب برای دفاتر مدیریتی، اتاق‌های کنفرانس و فضاهای کاری مدرن است. طراحی ارگونومیک آن، کار طولانی‌مدت را راحت و بدون خستگی می‌کند.`,
    specs: {
      dimensions: "۱۸۰ × ۸۰ × ۷۵ سانتی‌متر",
      material: "چوب نراد + فولاد ۲mm",
      color: "مشکی مات",
      weight: "۴۵ کیلوگرم",
      warranty: "ضمانت مادام‌العمر جوشکاری",
      coating: "رنگ کوره‌ای الکترواستاتیک"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان در صورت نقص" },
      { icon: Truck, title: "ارسال رایگان", desc: "به سراسر ایران" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.9,
    reviews: 127,
    inStock: true,
    category: "میز مدیریت"
  },
  {
    id: "2",
    name: "صندلی مدیریت ارگونومیک",
    subtitle: "راحتی و استایل",
    price: "۸,۹۰۰,۰۰۰",
    originalPrice: "۱۰,۰۰۰,۰۰۰",
    discount: 11,
    images: [productChair, productDesk, productShelf],
    description: "صندلی مدیریت ارگونومیک با طراحی منحصربه‌فرد، ترکیب چوب و فلز با پشتی قابل تنظیم.",
    longDescription: `صندلی مدیریت ارگونومیک صنایع مدرن با طراحی منحصربه‌فرد و استفاده از بهترین مواد اولیه ساخته شده است.

این صندلی با ترکیب چوب نراد خشک‌شده و اسکلت فولادی، هم زیبایی و هم استحکام را در خود جای داده است. پشتی قابل تنظیم و نشیمنگاه ارگونومیک، ساعت‌ها کار پشت میز را راحت می‌کند.`,
    specs: {
      dimensions: "۶۵ × ۶۵ × ۱۲۰ سانتی‌متر",
      material: "چوب نراد + فولاد ۲mm",
      color: "مشکی مات",
      weight: "۱۸ کیلوگرم",
      warranty: "ضمانت مادام‌العمر",
      coating: "رنگ کوره‌ای"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان" },
      { icon: Truck, title: "ارسال رایگان", desc: "به سراسر ایران" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    category: "صندلی"
  },
  {
    id: "3",
    name: "کتابخانه صنعتی مدرن",
    subtitle: "ذخیره‌سازی شیک",
    price: "۱۵,۸۰۰,۰۰۰",
    originalPrice: "۱۸,۰۰۰,۰۰۰",
    discount: 12,
    images: [productShelf, productDesk, productChair],
    description: "کتابخانه صنعتی با ۵ طبقه قابل تنظیم، مناسب برای دفاتر و منازل مدرن.",
    longDescription: `کتابخانه صنعتی مدرن صنایع با ۵ طبقه قابل تنظیم، فضای ذخیره‌سازی ایده‌آل برای کتاب‌ها، دکوری‌ها و لوازم شخصی فراهم می‌کند.

ساختار فولادی مستحکم و طبقات چوب نراد، ترکیبی زیبا و کاربردی ایجاد کرده‌اند.`,
    specs: {
      dimensions: "۱۲۰ × ۳۵ × ۲۰۰ سانتی‌متر",
      material: "چوب نراد + فولاد ۲mm",
      color: "مشکی مات",
      weight: "۳۵ کیلوگرم",
      warranty: "ضمانت مادام‌العمر",
      coating: "رنگ کوره‌ای"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان" },
      { icon: Truck, title: "ارسال رایگان", desc: "به سراسر ایران" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    category: "کتابخانه"
  },
  {
    id: "4",
    name: "میز کنفرانس ۸ نفره",
    subtitle: "جلسات حرفه‌ای",
    price: "۲۴,۰۰۰,۰۰۰",
    originalPrice: "۲۷,۰۰۰,۰۰۰",
    discount: 11,
    images: [productDesk, productShelf, productChair],
    description: "میز کنفرانس بزرگ برای جلسات حرفه‌ای با ظرفیت ۸ نفر، ساخته شده از چوب نراد و فولاد.",
    longDescription: `میز کنفرانس ۸ نفره صنایع مدرن، انتخابی ایده‌آل برای اتاق‌های جلسات و فضاهای کاری تیمی است.

این میز با ابعاد بزرگ و طراحی مینیمال، فضای کافی برای ۸ نفر فراهم می‌کند. ساختار فولادی مستحکم و صفحه چوب نراد خشک‌شده، دوام و زیبایی را تضمین می‌کنند.

امکان سفارش با ابعاد دلخواه و رنگ‌بندی متنوع وجود دارد.`,
    specs: {
      dimensions: "۲۴۰ × ۱۲۰ × ۷۵ سانتی‌متر",
      material: "چوب نراد + فولاد ۲mm",
      color: "مشکی مات",
      weight: "۷۰ کیلوگرم",
      warranty: "ضمانت مادام‌العمر جوشکاری",
      coating: "رنگ کوره‌ای الکترواستاتیک"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان در صورت نقص" },
      { icon: Truck, title: "ارسال رایگان", desc: "به سراسر ایران" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.7,
    reviews: 64,
    inStock: true,
    category: "مبلمان اداری"
  },
  {
    id: "5",
    name: "شلف دیواری مدولار",
    subtitle: "ترکیب‌بندی دلخواه",
    price: "۴,۲۰۰,۰۰۰",
    originalPrice: "۵,۰۰۰,۰۰۰",
    discount: 16,
    images: [productShelf, productChair, productDesk],
    description: "شلف مدولار با امکان ترکیب‌بندی دلخواه، مناسب برای هر فضایی.",
    longDescription: `شلف دیواری مدولار صنایع مدرن با طراحی منعطف، امکان چیدمان و ترکیب‌بندی متنوع را فراهم می‌کند.

هر ماژول به صورت مستقل قابل نصب است و می‌توانید با ترکیب چند ماژول، شلف دلخواه خود را بسازید. ساختار فولادی سبک و طبقات چوب نراد، زیبایی و کاربردی بودن را همزمان ارائه می‌دهند.`,
    specs: {
      dimensions: "۶۰ × ۲۵ × ۶۰ سانتی‌متر (هر ماژول)",
      material: "چوب نراد + فولاد ۱.۵mm",
      color: "مشکی مات / قهوه‌ای",
      weight: "۸ کیلوگرم",
      warranty: "ضمانت مادام‌العمر",
      coating: "رنگ کوره‌ای"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان" },
      { icon: Truck, title: "ارسال رایگان", desc: "سفارش بالای ۲ عدد" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    category: "شلف و کتابخانه"
  },
  {
    id: "6",
    name: "میز تحریر استودیویی",
    subtitle: "فضای کاری خلاق",
    price: "۷,۸۰۰,۰۰۰",
    originalPrice: "۹,۰۰۰,۰۰۰",
    discount: 13,
    images: [productDesk, productChair, productShelf],
    description: "میز تحریر مناسب برای فضاهای کاری خلاق با طراحی مینیمال و کاربردی.",
    longDescription: `میز تحریر استودیویی صنایع مدرن، همراه ایده‌آل برای طراحان، نویسندگان و افرادی که به فضای کاری الهام‌بخش نیاز دارند.

طراحی مینیمال با خطوط تمیز و فضای کافی برای مانیتور، لپ‌تاپ و لوازم جانبی. کشوی مخفی برای نظم‌دهی به لوازم و سیستم مدیریت کابل یکپارچه.`,
    specs: {
      dimensions: "۱۴۰ × ۶۵ × ۷۵ سانتی‌متر",
      material: "چوب نراد + فولاد ۲mm",
      color: "مشکی مات",
      weight: "۳۲ کیلوگرم",
      warranty: "ضمانت مادام‌العمر جوشکاری",
      coating: "رنگ کوره‌ای الکترواستاتیک"
    },
    features: [
      { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان در صورت نقص" },
      { icon: Truck, title: "ارسال رایگان", desc: "به سراسر ایران" },
      { icon: RotateCcw, title: "۷ روز مرجوعی", desc: "بدون سوال" },
    ],
    rating: 4.9,
    reviews: 91,
    inStock: true,
    category: "میز تحریر"
  }
];

const relatedProducts = products;

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Reset state when navigating between products
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setIsWishlisted(false);
    window.scrollTo(0, 0);
  }, [id]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />

      {/* Hero Product Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/" className="hover:text-primary transition-colors">صفحه اصلی</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="hover:text-primary transition-colors cursor-pointer">محصولات</span>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-primary font-medium">{product.name}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Images */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Main Image */}
              <motion.div
                variants={itemVariants}
                className="relative aspect-square rounded-[20px] overflow-hidden bg-card shadow-fluent-16"
                style={{ scale: imageScale, y: imageY }}
              >
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Discount Badge */}
                {product.discount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-4 right-4 bg-cta text-cta-foreground px-4 py-2 rounded-[20px] font-azarmehr-bold shadow-fluent-8"
                  >
                    {product.discount}٪ تخفیف
                  </motion.div>
                )}

                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="w-12 h-12 glass-header rounded-[20px] flex items-center justify-center pointer-events-auto shadow-fluent-8"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="w-12 h-12 glass-header rounded-[20px] flex items-center justify-center pointer-events-auto shadow-fluent-8"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              <motion.div 
                variants={itemVariants}
                className="flex gap-4"
              >
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 rounded-[20px] overflow-hidden transition-all duration-300 ${
                      selectedImage === idx 
                        ? 'ring-2 ring-primary shadow-fluent-16' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
              style={{ y: contentY }}
            >
              {/* Category */}
              <motion.span
                variants={itemVariants}
                className="inline-block px-4 py-2 glass-card text-accent rounded-[20px] text-sm font-azarmehr-medium"
              >
                {product.category}
              </motion.span>

              {/* Title */}
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-4xl font-azarmehr-bold text-primary mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground font-azarmehr">
                  {product.subtitle}
                </p>
              </motion.div>

              {/* Rating */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-ochre text-ochre' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <span className="text-muted-foreground font-azarmehr">
                  ({product.reviews} نظر)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div variants={itemVariants} className="flex items-end gap-4">
                <span className="text-4xl font-azarmehr-bold text-primary">
                  {product.price}
                </span>
                <span className="text-sm text-muted-foreground font-azarmehr mb-1">تومان</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through font-azarmehr mb-1">
                    {product.originalPrice}
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-foreground/80 leading-relaxed font-azarmehr"
              >
                {product.description}
              </motion.p>

              {/* Quantity Selector */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <span className="font-azarmehr-medium">تعداد:</span>
                <div className="flex items-center gap-3 glass-card rounded-[20px] p-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-[20px] flex items-center justify-center hover:bg-accent/10 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-12 text-center text-xl font-azarmehr-bold">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-[20px] flex items-center justify-center hover:bg-accent/10 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button variant="cta" size="xl" className="w-full font-azarmehr">
                    <ShoppingCart className="w-5 h-5" />
                    افزودن به سبد خرید
                  </Button>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: isWishlisted ? 0 : 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-all ${
                    isWishlisted 
                      ? 'bg-destructive text-white' 
                      : 'glass-card hover:bg-destructive/10'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-[20px] glass-card flex items-center justify-center hover:bg-accent/10 transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {product.features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-[20px] glass-card flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-azarmehr-bold text-sm text-primary">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground font-azarmehr">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Specifications */}
            <div className="glass-card p-8 rounded-[20px]">
              <h3 className="text-2xl font-azarmehr-bold text-primary mb-6 flex items-center gap-3">
                <Ruler className="w-6 h-6 text-accent" />
                مشخصات فنی
              </h3>
              <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground font-azarmehr">
                      {key === 'dimensions' && 'ابعاد'}
                      {key === 'material' && 'متریال'}
                      {key === 'color' && 'رنگ'}
                      {key === 'weight' && 'وزن'}
                      {key === 'warranty' && 'گارانتی'}
                      {key === 'coating' && 'پوشش'}
                    </span>
                    <span className="font-azarmehr-medium text-primary">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-8 rounded-[20px]">
              <h3 className="text-2xl font-azarmehr-bold text-primary mb-6 flex items-center gap-3">
                <TreeDeciduous className="w-6 h-6 text-accent" />
                توضیحات محصول
              </h3>
              <div className="prose prose-lg max-w-none">
                {product.longDescription.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-foreground/80 leading-relaxed font-azarmehr mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-azarmehr-bold mb-4">
              چرا صنایع مدرن؟
            </h2>
            <p className="text-primary-foreground/70 font-azarmehr max-w-2xl mx-auto">
              ما به کیفیت تعهد داریم و هر محصول با دقت و وسواس ساخته می‌شود
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "ضمانت مادام‌العمر", desc: "تعویض رایگان در صورت هرگونه نقص" },
              { icon: Ruler, title: "پروفیل ۲ میلی‌متر", desc: "استحکام و دوام بی‌نظیر" },
              { icon: Palette, title: "رنگ کوره‌ای", desc: "۱۵+ سال ماندگاری رنگ" },
              { icon: TreeDeciduous, title: "چوب نراد خشک", desc: "رطوبت زیر ۱۲ درصد" },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-dark p-6 rounded-[20px] text-center"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-[20px] bg-ochre/20 flex items-center justify-center"
                >
                  <item.icon className="w-8 h-8 text-ochre" />
                </motion.div>
                <h4 className="font-azarmehr-bold text-lg mb-2">{item.title}</h4>
                <p className="text-primary-foreground/70 text-sm font-azarmehr">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-azarmehr-bold text-primary mb-2">
                محصولات مرتبط
              </h2>
              <p className="text-muted-foreground font-azarmehr">
                سایر محصولات پیشنهادی ما
              </p>
            </div>
            <Link to="/#products">
              <Button variant="outline" className="font-azarmehr rounded-[20px]">
                مشاهده همه
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.filter(p => p.id !== product.id).slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-[20px] overflow-hidden group"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-accent font-azarmehr-medium">{item.category}</span>
                    <h4 className="font-azarmehr-bold text-lg text-primary mt-1 mb-2">{item.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-azarmehr-bold text-primary">{item.price}</span>
                      <span className="text-sm text-muted-foreground font-azarmehr">تومان</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cta to-ochre">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-azarmehr-bold text-white mb-4">
              سوالی دارید؟
            </h2>
            <p className="text-white/90 font-azarmehr mb-8 max-w-2xl mx-auto">
              تیم کارشناسان ما آماده پاسخگویی به سوالات شما هستند
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" size="lg" className="font-azarmehr rounded-[20px]">
                  <MessageCircle className="w-5 h-5" />
                  گفتگو در واتساپ
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="font-azarmehr rounded-[20px] border-white text-white hover:bg-white hover:text-cta">
                  تماس تلفنی
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AIChatBot />
    </div>
  );
};

export default ProductPage;
