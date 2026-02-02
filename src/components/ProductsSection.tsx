import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: 2,
    name: "کتابخانه صنعتی ۷ طبقه",
    category: "شلف و کتابخانه",
    price: "۸,۹۰۰,۰۰۰",
    image: productShelf,
    badge: null,
  },
  {
    id: 3,
    name: "صندلی مدیریتی ارگونومیک",
    category: "صندلی اداری",
    price: "۶,۵۰۰,۰۰۰",
    image: productChair,
    badge: "جدید",
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
        <div className="relative h-72 overflow-hidden">
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
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full w-14 h-14 glass shadow-fluent-8"
                  >
                    <Eye className="w-6 h-6" />
                  </Button>
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
          <h3 className="text-lg font-azarmehr-bold text-primary mt-1 mb-3">
            {product.name}
          </h3>
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
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm" className="font-azarmehr">
                مشاهده
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom accent line with 3D */}
        <motion.div
          className="h-1 bg-gradient-cta"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
          style={{ transformOrigin: "right" }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="py-32 bg-card relative overflow-hidden"
    >
      {/* Animated background decorations */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cta/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative">
        {/* Header with 3D reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
          className="text-center mb-16"
          style={{ perspective: 1000 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block px-6 py-2.5 glass-card text-primary rounded-[20px] text-sm font-azarmehr-medium mb-6"
          >
            کاتالوگ محصولات
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-azarmehr-bold text-primary mb-6">
            محصولات <span className="text-accent">باتیس مدرن</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-azarmehr text-lg">
            مجموعه‌ای از بهترین محصولات چوب و فلز با طراحی مدرن و کیفیت صنعتی
          </p>
        </motion.div>

        {/* Categories with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`px-7 py-3 rounded-[20px] text-sm font-azarmehr-medium transition-all duration-300 ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground shadow-fluent-16"
                  : "glass hover:bg-primary/10 text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div 
            whileHover={{ scale: 1.08, y: -5 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="industrial" size="lg" className="font-azarmehr text-lg px-10">
              مشاهده همه محصولات
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
