import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const progressMotion = useMotionValue(0);
  const pathLength = useTransform(progressMotion, [0, 100], [0, 1]);

  // Generate particles once
  const particles = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      size: Math.random() * 4 + 2,
      isAccent: i % 2 === 0,
    })), []
  );

  // Generate orbital dots
  const orbitalDots = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      delay: i * 0.1,
    })), []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev >= 100 ? 100 : Math.min(prev + Math.random() * 12 + 3, 100);
        progressMotion.set(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 600);
          }, 400);
        }
        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete, progressMotion]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.15,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(265 85% 12%) 0%, hsl(280 70% 18%) 50%, hsl(300 60% 15%) 100%)",
          }}
        >
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--accent) / 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, hsl(var(--cta) / 0.1) 0%, transparent 50%)",
                  "radial-gradient(ellipse 80% 50% at 80% 60%, hsl(var(--cta) / 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 20% 40%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
                  "radial-gradient(ellipse 80% 50% at 50% 80%, hsl(var(--accent) / 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 50% 20%, hsl(var(--cta) / 0.1) 0%, transparent 50%)",
                  "radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--accent) / 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, hsl(var(--cta) / 0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            
            {/* Noise Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Floating Grid Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{ y: [0, -100] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Main Logo Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0, 0.55, 0.45, 1] }}
            className="relative z-10 mb-6 sm:mb-8 md:mb-12"
          >
            {/* Outer Glow Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-8 sm:-m-12 md:-m-16 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Orbital System */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
              {/* Orbital Ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="url(#orbital-gradient-1)"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    opacity="0.4"
                  />
                  <defs>
                    <linearGradient id="orbital-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" />
                      <stop offset="100%" stopColor="hsl(var(--cta))" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Orbital Ring 2 - Counter rotate */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 sm:inset-3"
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="url(#orbital-gradient-2)"
                    strokeWidth="0.5"
                    strokeDasharray="2 6"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="orbital-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--cta))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Progress Circle */}
              <div className="absolute inset-3 sm:inset-4 md:inset-5">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  {/* Progress Circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength }}
                    strokeDasharray="1"
                    strokeDashoffset="0"
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" />
                      <stop offset="50%" stopColor="hsl(var(--cta))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Orbital Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {orbitalDots.map((dot) => (
                  <motion.div
                    key={dot.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + dot.delay, duration: 0.3 }}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{
                      background: dot.id % 2 === 0 ? "hsl(var(--accent))" : "hsl(var(--cta))",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${dot.angle}deg) translateY(-${dot.id % 2 === 0 ? 44 : 38}px) translate(-50%, -50%)`,
                      boxShadow: `0 0 10px ${dot.id % 2 === 0 ? "hsl(var(--accent) / 0.6)" : "hsl(var(--cta) / 0.6)"}`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Center Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Logo Glow */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px hsl(var(--accent) / 0.5), 0 0 40px hsl(var(--cta) / 0.3)",
                        "0 0 30px hsl(var(--cta) / 0.5), 0 0 60px hsl(var(--accent) / 0.3)",
                        "0 0 20px hsl(var(--accent) / 0.5), 0 0 40px hsl(var(--cta) / 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-xl sm:rounded-2xl"
                  />
                  
                  {/* Logo Box */}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent via-cta to-accent flex items-center justify-center overflow-hidden">
                    {/* Inner Shine */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                    <span className="relative text-lg sm:text-2xl md:text-3xl font-azarmehr-bold text-white drop-shadow-lg">
                      ص
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0, 0.55, 0.45, 1] }}
            className="relative z-10 mb-6 sm:mb-8 text-center px-4"
          >
            {/* Animated Text */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-azarmehr-bold"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--cta)) 50%, hsl(var(--accent)) 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              صنایع مدرن
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground font-azarmehr"
            >
              طراحی و ساخت مبلمان صنعتی
            </motion.p>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-xs md:max-w-sm px-6"
          >
            {/* Progress Bar Container */}
            <div className="relative">
              {/* Glow Behind Bar */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-2 rounded-full blur-xl"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--accent) / ${progress / 200}), hsl(var(--cta) / ${progress / 200}))`,
                }}
              />
              
              {/* Track */}
              <div className="relative h-2 sm:h-2.5 rounded-full bg-muted/50 overflow-hidden backdrop-blur-sm border border-border/20">
                {/* Animated Background Shimmer */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                
                {/* Progress Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--cta)), hsl(var(--accent)))",
                    backgroundSize: "200% 100%",
                  }}
                >
                  {/* Moving Gradient */}
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
                
                {/* Progress Dot */}
                <motion.div
                  animate={{ left: `${progress}%` }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-lg"
                  style={{
                    boxShadow: "0 0 15px hsl(var(--cta)), 0 2px 10px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            </div>

            {/* Progress Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 sm:mt-5 flex justify-between items-center text-xs sm:text-sm"
            >
              <span className="text-muted-foreground font-azarmehr">در حال آماده‌سازی...</span>
              <motion.span 
                className="font-mono font-bold text-foreground"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: `${particle.initialX}%`,
                  y: "110%",
                  scale: 0,
                }}
                animate={{
                  y: "-10%",
                  scale: [0, 1, 0.5, 0],
                  opacity: [0, 0.8, 0.4, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: particle.isAccent
                    ? "hsl(var(--accent))"
                    : "hsl(var(--cta))",
                  boxShadow: `0 0 ${particle.size * 2}px ${
                    particle.isAccent
                      ? "hsl(var(--accent) / 0.5)"
                      : "hsl(var(--cta) / 0.5)"
                  }`,
                }}
              />
            ))}
          </div>

          {/* NeXTPixel Badge */}
          <motion.a
            href="https://nextpixel.ir"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 group cursor-pointer border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              marginBottom: 'env(safe-area-inset-bottom, 0px)',
              marginLeft: 'env(safe-area-inset-left, 0px)',
            }}
          >
            {/* Logo */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent to-cta flex items-center justify-center flex-shrink-0">
              <span className="text-white font-azarmehr-bold text-xs sm:text-sm">N</span>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[10px] text-white/50 font-azarmehr leading-none">Made By</span>
              <span className="text-xs sm:text-sm font-azarmehr-bold text-white/90 leading-tight group-hover:text-white transition-colors">
                NeXTPixel
              </span>
            </div>
          </motion.a>

          {/* Corner Decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 0 50 Q 25 25, 50 0"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
              <motion.path
                d="M 0 80 Q 40 40, 80 0"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 1.5 }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 rotate-180"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M 0 50 Q 25 25, 50 0"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
              <motion.path
                d="M 0 80 Q 40 40, 80 0"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7, duration: 1.5 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
