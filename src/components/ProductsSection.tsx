import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section id="products" className="py-24 bg-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 glass-card text-primary rounded-full text-sm font-vazir font-medium mb-4"
          >
            کاتالوگ محصولات
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-vazir-bold text-primary mb-4">
            محصولات <span className="text-accent">باتیس مدرن</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-vazir">
            مجموعه‌ای از بهترین محصولات چوب و فلز با طراحی مدرن و کیفیت صنعتی
          </p>
        </motion.div>

        {/* Categories - Glassmorphism tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.1, 0.9, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-vazir font-medium transition-all duration-300 ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground shadow-fluent-8"
                  : "glass hover:bg-primary/10 text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.1, 0.9, 0.2, 1]
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="product-card group glass-card rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredProduct === product.id ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
                />
                
                {/* Badge */}
                {product.badge && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-vazir font-medium rounded-full shadow-fluent-4 ${
                      product.badge === "پرفروش" 
                        ? "bg-cta text-cta-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {product.badge}
                  </motion.span>
                )}

                {/* Quick Actions - Glassmorphism overlay */}
                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 glass-dark flex items-center justify-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Button variant="secondary" size="icon" className="rounded-full w-12 h-12 glass">
                          <Eye className="w-5 h-5" />
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      >
                        <Button variant="cta" size="icon" className="rounded-full w-12 h-12">
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-accent font-vazir font-medium">
                  {product.category}
                </span>
                <h3 className="text-lg font-vazir-bold text-primary mt-1 mb-3">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-vazir-bold text-cta">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground mr-1 font-vazir">
                      تومان
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="font-vazir">
                      مشاهده
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="industrial" size="lg" className="font-vazir">
              مشاهده همه محصولات
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;