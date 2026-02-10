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
        const newProgress = prev >= 100 ? 100 : Math.min(prev + Math.random() * 15 + 5, 100);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(265 85% 12%) 0%, hsl(280 70% 18%) 50%, hsl(300 60% 15%) 100%)",
          }}
        >
          {/* Simple gradient background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--accent) / 0.3) 0%, transparent 60%)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mb-8"
          >
            {/* Progress Ring */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="2"
                  opacity="0.3"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="url(#progress-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} 283`}
                  style={{ transition: "stroke-dasharray 0.15s ease" }}
                />
                <defs>
                  <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--cta))" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent to-cta flex items-center justify-center">
                  <span className="text-xl sm:text-3xl font-azarmehr-bold text-white">ص</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 mb-8 text-center"
          >
            <h1
              className="text-2xl sm:text-4xl font-azarmehr-bold"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--cta)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              صنایع مدرن
            </h1>
            <p className="mt-2 text-sm text-muted-foreground font-azarmehr">
              طراحی و ساخت مبلمان صنعتی
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 w-full max-w-xs px-6"
          >
            <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--cta)))",
                }}
              />
            </div>
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-azarmehr">در حال آماده‌سازی...</span>
              <span className="font-mono font-bold text-foreground">{Math.round(progress)}%</span>
            </div>
          </motion.div>

          {/* NeXTPixel Badge */}
          <a
            href="https://nextpixel.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10 px-3 py-2 sm:px-4 sm:py-3 rounded-xl flex items-center gap-2 group cursor-pointer border border-white/10 hover:border-white/20 transition-colors"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              marginBottom: "env(safe-area-inset-bottom, 0px)",
              marginLeft: "env(safe-area-inset-left, 0px)",
            }}
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-accent to-cta flex items-center justify-center flex-shrink-0">
              <span className="text-white font-azarmehr-bold text-xs sm:text-sm">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[10px] text-white/50 font-azarmehr leading-none">Made By</span>
              <span className="text-xs sm:text-sm font-azarmehr-bold text-white/90 leading-tight group-hover:text-white transition-colors">
                NeXTPixel
              </span>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
