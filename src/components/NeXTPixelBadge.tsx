import { motion } from "framer-motion";

const NeXTPixelBadge = () => {
  return (
    <motion.a
      href="https://nextpixel.top"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 glass-card px-3 py-2 sm:px-4 sm:py-3 rounded-2xl sm:rounded-[20px] shadow-fluent-16 flex items-center gap-2 sm:gap-3 group cursor-pointer border border-accent/20 hover:border-accent/40 transition-colors safe-area-inset-bottom"
      style={{
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
        marginLeft: 'env(safe-area-inset-left, 0px)',
      }}
    >
      {/* Logo */}
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-[12px] bg-gradient-to-br from-accent to-cta flex items-center justify-center flex-shrink-0">
        <span className="text-white font-azarmehr-bold text-xs sm:text-sm">N</span>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-[8px] sm:text-[10px] text-muted-foreground font-azarmehr leading-none">Made By</span>
        <span className="text-xs sm:text-sm font-azarmehr-bold text-primary leading-tight group-hover:text-accent transition-colors">
          NeXTPixel
        </span>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl sm:rounded-[20px] bg-gradient-to-r from-accent/10 to-cta/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
        style={{ filter: "blur(8px)" }}
      />
    </motion.a>
  );
};

export default NeXTPixelBadge;
