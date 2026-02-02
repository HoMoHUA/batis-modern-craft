import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        // Simulate loading with variable speed
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, hsl(var(--cta) / 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, hsl(var(--accent) / 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </div>

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mb-8 md:mb-12"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 40px hsl(var(--accent) / 0.3)",
                  "0 0 80px hsl(var(--cta) / 0.4)",
                  "0 0 40px hsl(var(--accent) / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full blur-2xl"
            />
            
            {/* Logo Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative w-20 h-20 md:w-28 md:h-28"
            >
              {/* Outer Ring */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient-ring)"
                  strokeWidth="2"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--cta))" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-cta flex items-center justify-center">
                  <span className="text-lg md:text-2xl font-bold text-white font-display">
                    ص
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10 mb-6 md:mb-8 text-center"
          >
            <h1 className="text-2xl md:text-4xl font-display font-bold bg-gradient-cta bg-clip-text text-transparent">
              صنایع مدرن
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-2 text-sm md:text-base text-muted-foreground"
            >
              طراحی و ساخت مبلمان صنعتی
            </motion.p>
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-10 w-full max-w-[200px] md:max-w-xs px-4"
          >
            {/* Progress Track */}
            <div className="relative h-1.5 md:h-2 rounded-full bg-muted overflow-hidden">
              {/* Animated Shimmer */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              
              {/* Progress Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-cta"
                style={{
                  boxShadow: "0 0 20px hsl(var(--cta) / 0.5)",
                }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 md:mt-4 flex justify-between items-center text-xs md:text-sm"
            >
              <span className="text-muted-foreground">در حال بارگذاری...</span>
              <span className="font-mono text-foreground font-medium">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
                className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
                style={{
                  background: i % 2 === 0 
                    ? "hsl(var(--accent) / 0.6)" 
                    : "hsl(var(--cta) / 0.6)",
                  filter: "blur(1px)",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
