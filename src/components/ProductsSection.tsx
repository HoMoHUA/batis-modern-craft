import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import productDesk from "@/assets/product-desk.jpg";
import productShelf from "@/assets/product-shelf.jpg";
import productChair from "@/assets/product-chair.jpg";

const products = [
  {
    id: 1,
    name: "میز مدیریت اگزکیوتیو",
    category: "مبلمان اداری",
    price: "۱۲,۵۰۰,۰۰۰",
    image: productDesk,
    badge: "پرفروش",
    description: "میز مدیریت با پروفیل فولادی ۲mm و چوب نراد خشک‌شده",
  },
  {
    id: 2,
    name: "کتابخانه صنعتی ۷ طبقه",
    category: "شلف و کتابخانه",
    price: "۸,۹۰۰,۰۰۰",
    image: productShelf,
    badge: null,
    description: "کتابخانه مدرن با طبقات قابل تنظیم و اسکلت فولادی",
  },
  {
    id: 3,
    name: "صندلی مدیریتی ارگونومیک",
    category: "صندلی اداری",
    price: "۶,۵۰۰,۰۰۰",
    image: productChair,
    badge: "جدید",
    description: "صندلی ارگونومیک با پشتی قابل تنظیم و نشیمنگاه راحت",
  },
  {
    id: 4,
    name: "میز کنفرانس ۸ نفره",
    category: "مبلمان اداری",
    price: "۲۴,۰۰۰,۰۰۰",
    image: productDesk,
    badge: "سفارشی",
    description: "میز کنفرانس بزرگ برای جلسات حرفه‌ای",
  },
  {
    id: 5,
    name: "شلف دیواری مدولار",
    category: "شلف و کتابخانه",
    price: "۴,۲۰۰,۰۰۰",
    image: productShelf,
    badge: null,
    description: "شلف مدولار با امکان ترکیب‌بندی دلخواه",
  },
  {
    id: 6,
    name: "میز تحریر استودیویی",
    category: "میز تحریر",
    price: "۷,۸۰۰,۰۰۰",
    image: productDesk,
    badge: "جدید",
    description: "میز تحریر مناسب برای فضاهای کاری خلاق",
  },
];

const categories = [
  "همه محصولات",
  "مبلمان اداری",
  "شلف و کتابخانه",
  "میز تحریر",
  "صندلی",
];

// 3D Card Variants
const cardVariants = {
  hidden: { 
    opacity: 0,
    rotateX: 15,
    rotateY: -15,
    scale: 0.9,
    y: 60
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.1, 0.9, 0.2, 1] as const
    }
  })
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="group"
    >
      <motion.div
        animate={{
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card rounded-[20px] overflow-hidden shadow-fluent-8 hover:shadow-fluent-64 transition-shadow duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image Container */}
        <Link to={`/product/${product.id}`}>
          <div className="relative h-72 overflow-hidden cursor-pointer">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
            />
            
            {/* 3D Floating Badge */}
            {product.badge && (
              <motion.span
                initial={{ opacity: 0, x: 30, rotateZ: 10 }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{ 
                  transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
                  transition: "transform 0.3s"
                }}
                className={`absolute top-4 right-4 px-5 py-2 text-xs font-azarmehr-medium rounded-[20px] shadow-fluent-8 ${
                  product.badge === "پرفروش" 
                    ? "bg-cta text-cta-foreground" 
                    : product.badge === "سفارشی"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {product.badge}
              </motion.span>
            )}

            {/* Hover Overlay with 3D Actions */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-primary/60 backdrop-blur-sm flex items-center justify-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0, rotateZ: -180, y: 20 }}
                    animate={{ scale: 1, rotateZ: 0, y: 0 }}
                    exit={{ scale: 0, rotateZ: 180, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="rounded-full w-14 h-14 glass shadow-fluent-8"
                      >
                        <Eye className="w-6 h-6" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotateZ: 180, y: 20 }}
                    animate={{ scale: 1, rotateZ: 0, y: 0 }}
                    exit={{ scale: 0, rotateZ: -180, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  >
                    <Button 
                      variant="cta" 
                      size="icon" 
                      className="rounded-full w-14 h-14 shadow-fluent-8"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3D Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"
              animate={{
                opacity: isHovered ? 0.5 : 0,
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        </Link>

        {/* Content with 3D depth */}
        <motion.div 
          className="p-6"
          style={{ 
            transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
            transition: "transform 0.3s"
          }}
        >
          <span className="text-xs text-accent font-azarmehr-medium">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-azarmehr-bold text-primary mt-1 mb-2 hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground font-azarmehr mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-azarmehr-bold text-cta">
                {product.price}
              </span>
              <span className="text-sm text-muted-foreground mr-1 font-azarmehr">
                تومان
              </span>
            </div>
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotateZ: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("همه محصولات");
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const filteredProducts = activeCategory === "همه محصولات" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2.5 glass-card text-primary rounded-[20px] text-sm font-azarmehr-medium mb-6"
          >
            محصولات باتیس مدرن
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-azarmehr-bold text-primary mb-6">
            <span className="text-accent">صنعتگری</span> در خدمت زیبایی
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-azarmehr text-lg">
            هر قطعه با دقت میلی‌متری و استفاده از بهترین مواد اولیه ساخته شده است.
            ترکیب منحصربه‌فرد فلز و چوب، محصولاتی ماندگار می‌سازد.
          </p>
        </motion.div>

        {/* Categories Filter with 3D Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-3 rounded-[20px] text-sm font-azarmehr-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-fluent-16"
                  : "glass-card text-primary hover:bg-accent/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid with 3D Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: 1000 }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="xl" className="font-azarmehr rounded-[20px]">
              مشاهده همه محصولات
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
