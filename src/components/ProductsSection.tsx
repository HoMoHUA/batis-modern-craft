import { motion } from "framer-motion";
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
  return (
    <section id="products" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded text-sm font-medium mb-4">
            کاتالوگ محصولات
          </span>
          <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary mb-4">
            محصولات <span className="text-accent">باتیس مدرن</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعه‌ای از بهترین محصولات چوب و فلز با طراحی مدرن و کیفیت صنعتی
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="product-card group bg-background rounded border border-border overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded ${
                    product.badge === "پرفروش" 
                      ? "bg-cta text-cta-foreground" 
                      : "bg-accent text-accent-foreground"
                  }`}>
                    {product.badge}
                  </span>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Eye className="w-5 h-5" />
                  </Button>
                  <Button variant="cta" size="icon" className="rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-accent font-medium">
                  {product.category}
                </span>
                <h3 className="text-lg font-industrial font-bold text-primary mt-1 mb-3">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-industrial font-bold text-cta">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground mr-1">
                      تومان
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    مشاهده
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="industrial" size="lg">
            مشاهده همه محصولات
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;