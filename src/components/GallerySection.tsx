import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import galleryRoom from "@/assets/gallery-room.jpg";

const hotspots = [
  { id: 1, x: 15, y: 50, name: "کتابخانه صنعتی", price: "۸,۹۰۰,۰۰۰" },
  { id: 2, x: 45, y: 65, name: "میز جلو مبلی", price: "۴,۵۰۰,۰۰۰" },
  { id: 3, x: 75, y: 45, name: "شلف دیواری", price: "۳,۲۰۰,۰۰۰" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded text-sm font-medium mb-4">
            گالری تعاملی
          </span>
          <h2 className="text-3xl md:text-4xl font-industrial font-bold text-primary mb-4">
            محصولات در <span className="text-accent">فضای واقعی</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            روی نقاط مشخص شده کلیک کنید تا اطلاعات محصول را ببینید
          </p>
        </motion.div>

        {/* Interactive Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-lg overflow-hidden shadow-industrial"
        >
          <img
            src={galleryRoom}
            alt="فضای داخلی با مبلمان باتیس مدرن"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <motion.div
              key={spot.id}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: spot.id * 0.2, type: "spring" }}
              className="absolute group cursor-pointer"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              {/* Pulse Ring */}
              <span className="absolute inset-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 bg-cta/30 rounded-full animate-ping" />
              
              {/* Hotspot Button */}
              <div className="relative w-10 h-10 -translate-x-1/2 -translate-y-1/2 bg-cta rounded-full flex items-center justify-center text-cta-foreground shadow-lg group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-4 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-10">
                <h4 className="font-bold text-primary mb-1">{spot.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-cta font-bold">{spot.price}</span>
                  <span className="text-xs text-muted-foreground">تومان</span>
                </div>
                <button className="mt-2 text-xs text-accent hover:underline">
                  مشاهده محصول ←
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;