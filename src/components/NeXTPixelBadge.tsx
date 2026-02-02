import { motion } from "framer-motion";

const NeXTPixelBadge = () => {
  return (
    <motion.a
      href="https://nextpixel.ir"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 glass-card px-4 py-3 rounded-[20px] shadow-fluent-16 flex items-center gap-3 group cursor-pointer border border-accent/20 hover:border-accent/40 transition-colors"
    >
      {/* Logo */}
      <div className="w-8 h-8 rounded-[12px] bg-gradient-to-br from-accent to-cta flex items-center justify-center">
        <span className="text-white font-azarmehr-bold text-sm">N</span>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground font-azarmehr leading-none">Made By</span>
        <span className="text-sm font-azarmehr-bold text-primary leading-tight group-hover:text-accent transition-colors">
          NeXTPixel
        </span>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-accent/10 to-cta/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
        style={{ filter: "blur(8px)" }}
      />
    </motion.a>
  );
};

export default NeXTPixelBadge;
