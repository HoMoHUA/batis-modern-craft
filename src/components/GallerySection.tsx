import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryRoom from "@/assets/gallery-room.jpg";

const hotspots = [
  { id: 1, x: 15, y: 50, name: "کتابخانه صنعتی", price: "۸,۹۰۰,۰۰۰" },
  { id: 2, x: 45, y: 65, name: "میز جلو مبلی", price: "۴,۵۰۰,۰۰۰" },
  { id: 3, x: 75, y: 45, name: "شلف دیواری", price: "۳,۲۰۰,۰۰۰" },
];

const GallerySection = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

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
            className="inline-block px-5 py-2 glass-card text-accent rounded-[20px] text-sm font-azarmehr font-medium mb-4"
          >
            گالری تعاملی
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-azarmehr-bold text-primary mb-4">
            محصولات در <span className="text-accent">فضای واقعی</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-azarmehr">
            روی نقاط مشخص شده کلیک کنید تا اطلاعات محصول را ببینید
          </p>
        </motion.div>

        {/* Interactive Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.1, 0.9, 0.2, 1] }}
          className="relative rounded-[20px] overflow-hidden shadow-fluent-64"
        >
          <img
            src={galleryRoom}
            alt="فضای داخلی با مبلمان باتیس مدرن"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

          {/* Hotspots */}
          {hotspots.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.5 + index * 0.15, 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
              className="absolute cursor-pointer"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
            >
              {/* Pulse Ring */}
              <motion.span
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: [0.1, 0.9, 0.2, 1]
                }}
                className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-cta/40 rounded-[20px]"
              />
              
              {/* Hotspot Button */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-cta rounded-[20px] flex items-center justify-center text-cta-foreground shadow-fluent-16"
              >
                <AnimatePresence mode="wait">
                  {activeHotspot === spot.id ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plus"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Tooltip - Glassmorphism */}
              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 glass-card rounded-[20px] p-5 shadow-fluent-16 min-w-[200px] z-20"
                  >
                    <h4 className="font-azarmehr-bold text-primary mb-2">{spot.name}</h4>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-azarmehr-bold text-cta">{spot.price}</span>
                      <span className="text-xs text-muted-foreground font-azarmehr">تومان</span>
                    </div>
                    <Button variant="cta" size="sm" className="w-full font-azarmehr">
                      <ShoppingCart className="w-4 h-4" />
                      افزودن به سبد
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;