import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollAnimationConfig {
  inputRange?: [number, number];
  outputRange?: [number, number];
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export const useScrollAnimation = (config?: ScrollAnimationConfig) => {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = {
    stiffness: config?.springConfig?.stiffness ?? 100,
    damping: config?.springConfig?.damping ?? 30,
    mass: config?.springConfig?.mass ?? 1
  };

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return {
    ref,
    scrollYProgress,
    smoothProgress,
    useParallax: (distance: number) => useTransform(smoothProgress, [0, 1], [0, distance]),
    useOpacity: (start = 0, end = 1) => useTransform(smoothProgress, [0, 0.5, 1], [start, end, start]),
    useScale: (min = 0.8, max = 1) => useTransform(smoothProgress, [0, 0.5, 1], [min, max, min]),
    useRotate: (degrees: number) => useTransform(smoothProgress, [0, 1], [degrees, 0]),
  };
};

export const usePageScroll = () => {
  const { scrollY, scrollYProgress } = useScroll();
  
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothScrollY = useSpring(scrollY, springConfig);
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return {
    scrollY,
    scrollYProgress,
    smoothScrollY,
    smoothProgress
  };
};

export const useParallaxEffect = (
  scrollProgress: MotionValue<number>,
  inputRange: [number, number] = [0, 1],
  outputRange: [number, number] = [0, 100]
) => {
  return useTransform(scrollProgress, inputRange, outputRange);
};
