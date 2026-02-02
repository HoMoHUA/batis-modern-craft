import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Home, Package, Sparkles, Image, Ruler, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // Scroll direction detection refs - optimized for performance
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized scroll handler with requestAnimationFrame for smooth 60fps
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    
    ticking.current = true;
    
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // Update basic scroll states
      setScrolled(currentScrollY > 20);
      setIsFloating(currentScrollY > 100);
      
      // Smart toolbar visibility - only show when scrolling up
      // But keep visible if menu is open
      if (currentScrollY > 100) {
        if (scrollDelta < -5) {
          // Scrolling UP - show toolbar
          setShowToolbar(true);
        } else if (scrollDelta > 5) {
          // Scrolling DOWN - hide toolbar ONLY if menu is closed
          // Check current state using refs to avoid stale closure
          if (!isMobileMenuOpen && !isDesktopMenuOpen) {
            setShowToolbar(false);
          }
        }
      } else {
        // At top of page, always show
        setShowToolbar(true);
      }
      
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, [isMobileMenuOpen, isDesktopMenuOpen]);

  useEffect(() => {
    // Passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const navItems = useMemo(() => [
    { name: "صفحه اصلی", href: "/", hash: "#hero", icon: Home },
    { name: "محصولات", href: "/", hash: "#products", icon: Package },
    { name: "کیفیت", href: "/", hash: "#quality", icon: Sparkles },
    { name: "گالری", href: "/", hash: "#gallery", icon: Image },
    { name: "سفارش سفارشی", href: "/", hash: "#custom", icon: Ruler },
  ], []);

  const handleNavClick = useCallback((item: typeof navItems[0]) => {
    if (location.pathname === "/") {
      const element = document.querySelector(item.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isDark = mounted && theme === "dark";

  // Memoized animation variants to prevent re-creation on each render
  const floatingVariants = useMemo(() => ({
    hidden: { 
      y: -200, 
      x: 100, 
      opacity: 0,
      scale: 0.8,
      rotate: -10
    },
    visible: { 
      y: 0, 
      x: 0, 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1,
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    },
    exit: { 
      y: -100, 
      x: 50, 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3, ease: [0.1, 0.9, 0.2, 1] as const }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { scale: 0, opacity: 0, y: -20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 15 }
    }
  }), []);

  // Mobile menu animation variants - optimized for GPU acceleration
  const mobileMenuVariants = useMemo(() => ({
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }), []);

  const mobileItemVariants = useMemo(() => ({
    closed: { scale: 0, opacity: 0 },
    open: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 25 }
    }
  }), []);

  // Hamburger button animation variants
  const hamburgerVariants = useMemo(() => ({
    hidden: { 
      y: -100, 
      opacity: 0, 
      scale: 0.5 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      y: -50, 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }), []);

  const ThemeButton = useCallback(({ className = "", size = "normal" }: { className?: string; size?: "normal" | "small" }) => (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${size === "small" ? "w-9 h-9" : "w-10 h-10"} rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.15, x: -5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "روشن" : "تاریک"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={size === "small" ? "w-4 h-4" : "w-5 h-5"} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className={size === "small" ? "w-4 h-4" : "w-5 h-5"} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  ), [isDark, setTheme]);

  return (
    <>
      {/* Normal Header - Hidden when floating */}
      <AnimatePresence>
        {!isFloating && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.1, 0.9, 0.2, 1] }}
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
              scrolled
                ? "glass-header shadow-fluent-8"
                : "bg-transparent"
            }`}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link to="/">
                  <motion.div
                    className="flex items-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-cta rounded-[20px] flex items-center justify-center shadow-fluent-4 group-hover:shadow-fluent-8 transition-shadow duration-300">
                      <span className="text-primary-foreground font-azarmehr-bold text-lg">ص</span>
                    </div>
                    <span className="font-azarmehr-bold text-xl text-primary">
                      صنایع مدرن
                    </span>
                  </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.div key={item.name}>
                      {item.href === "/" && location.pathname === "/" ? (
                        <motion.a
                          href={item.hash}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-azarmehr font-medium link-underline py-1"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item);
                          }}
                        >
                          {item.name}
                        </motion.a>
                      ) : (
                        <Link
                          to={item.href + item.hash}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-azarmehr font-medium link-underline py-1"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  {mounted && <ThemeButton />}
                  <motion.a
                    href="tel:+989123456789"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-[20px] hover:bg-accent/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-azarmehr font-medium">۰۹۱۲۳۴۵۶۷۸۹</span>
                  </motion.a>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="cta" size="sm" className="font-azarmehr rounded-[20px]">
                      مشاوره رایگان
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                  {mounted && <ThemeButton />}
                  <motion.button
                    className="p-2 text-primary glass rounded-[20px]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Menu - Glassmorphism */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, height: "auto", backdropFilter: "blur(20px)" }}
                  exit={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
                  className="md:hidden glass-card border-t-0 rounded-b-[20px] mx-4 overflow-hidden"
                >
                  <nav className="p-6 flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.div key={item.name}>
                        {item.href === "/" && location.pathname === "/" ? (
                          <motion.a
                            href={item.hash}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="text-foreground hover:text-accent hover:bg-accent/10 transition-all py-3 px-4 font-azarmehr font-medium rounded-[20px] flex items-center gap-3"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item);
                            }}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                          </motion.a>
                        ) : (
                          <Link
                            to={item.href + item.hash}
                            className="text-foreground hover:text-accent hover:bg-accent/10 transition-all py-3 px-4 font-azarmehr font-medium rounded-[20px] flex items-center gap-3"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="flex flex-col gap-3 pt-4 mt-2 border-t border-border"
                    >
                      <a href="tel:+989123456789" className="flex items-center gap-2 text-muted-foreground px-4">
                        <Phone className="w-4 h-4" />
                        <span className="font-azarmehr">۰۹۱۲۳۴۵۶۷۸۹</span>
                      </a>
                      <Button variant="cta" className="w-full font-azarmehr rounded-[20px]">
                        مشاوره رایگان
                      </Button>
                    </motion.div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Desktop Floating Hamburger Button - Smart visibility (shows on scroll up only) */}
      <AnimatePresence>
        {isFloating && showToolbar && (
          <motion.div
            variants={hamburgerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-4 top-1/2 z-50 hidden md:block"
            style={{
              transform: 'translateY(-50%)',
              willChange: 'transform, opacity',
            }}
          >
            {/* Hamburger Button */}
            <motion.button
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              className="w-14 h-14 glass-header rounded-[20px] flex items-center justify-center shadow-fluent-8 text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDesktopMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              <AnimatePresence mode="wait">
                {isDesktopMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Expanded Menu - Radial expansion from hamburger button */}
            <AnimatePresence>
              {isDesktopMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-16 top-1/2 -translate-y-1/2 glass-header rounded-[20px] p-3 flex flex-col items-center gap-2 shadow-fluent-16 origin-right"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Logo */}
                  <Link to="/" onClick={() => setIsDesktopMenuOpen(false)}>
                    <motion.div
                      variants={mobileItemVariants}
                      className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-[20px] flex items-center justify-center shadow-fluent-4 hover:shadow-fluent-8 transition-shadow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-primary-foreground font-azarmehr-bold text-lg">ص</span>
                    </motion.div>
                  </Link>

                  {/* Divider */}
                  <motion.div variants={mobileItemVariants} className="w-8 h-px bg-border my-1" />

                  {/* Navigation Icons */}
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      {item.href === "/" && location.pathname === "/" ? (
                        <motion.a
                          href={item.hash}
                          className="w-10 h-10 rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 group relative"
                          whileHover={{ scale: 1.15, x: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item);
                            setIsDesktopMenuOpen(false);
                          }}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="absolute left-full ml-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-azarmehr rounded-[20px] opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8 group-hover:opacity-100 transition-opacity duration-200">
                            {item.name}
                          </span>
                        </motion.a>
                      ) : (
                        <Link to={item.href + item.hash} onClick={() => setIsDesktopMenuOpen(false)}>
                          <motion.div
                            className="w-10 h-10 rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 group relative"
                            whileHover={{ scale: 1.15, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="absolute left-full ml-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-azarmehr rounded-[20px] opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8 group-hover:opacity-100 transition-opacity duration-200">
                              {item.name}
                            </span>
                          </motion.div>
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  {/* Divider */}
                  <motion.div variants={mobileItemVariants} className="w-8 h-px bg-border my-1" />

                  {/* Dark Mode Toggle */}
                  {mounted && (
                    <motion.div variants={mobileItemVariants}>
                      <motion.button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="w-10 h-10 rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300"
                        whileHover={{ scale: 1.15, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {isDark ? (
                            <motion.div
                              key="moon"
                              initial={{ rotate: -90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              exit={{ rotate: 90, scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Moon className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="sun"
                              initial={{ rotate: 90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              exit={{ rotate: -90, scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Sun className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.a
                    href="tel:+989123456789"
                    variants={mobileItemVariants}
                    className="w-10 h-10 rounded-[20px] flex items-center justify-center bg-cta text-cta-foreground shadow-fluent-4"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Hamburger Button - Smart visibility (shows on scroll up only) */}
      <AnimatePresence>
        {isFloating && showToolbar && (
          <motion.div
            variants={hamburgerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-3 top-1/2 z-50 md:hidden"
            style={{
              marginRight: 'env(safe-area-inset-right, 0px)',
              transform: 'translateY(-50%)',
              // GPU acceleration for smooth animations
              willChange: 'transform, opacity',
            }}
          >
            {/* Hamburger Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 glass-header rounded-2xl flex items-center justify-center shadow-fluent-8 text-primary"
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Expanded Menu - Radial expansion from hamburger button */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 top-16 glass-header rounded-2xl p-2 flex flex-col items-center gap-1.5 shadow-fluent-16 origin-top-right"
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Logo */}
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      variants={mobileItemVariants}
                      className="w-10 h-10 bg-gradient-to-br from-accent to-cta rounded-xl flex items-center justify-center shadow-fluent-4"
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-primary-foreground font-azarmehr-bold text-sm">ص</span>
                    </motion.div>
                  </Link>

                  {/* Divider */}
                  <motion.div 
                    variants={mobileItemVariants}
                    className="w-6 h-px bg-border my-0.5" 
                  />

                  {/* Navigation Icons */}
                  {navItems.map((item) => (
                    <motion.div key={item.name} variants={mobileItemVariants}>
                      {item.href === "/" && location.pathname === "/" ? (
                        <motion.a
                          href={item.hash}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 group relative"
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item);
                          }}
                        >
                          <item.icon className="w-4 h-4" />
                          {/* Tooltip */}
                          <span className="absolute left-full ml-2 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-azarmehr rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8 group-hover:opacity-100 transition-opacity duration-200">
                            {item.name}
                          </span>
                        </motion.a>
                      ) : (
                        <Link to={item.href + item.hash} onClick={() => setIsMobileMenuOpen(false)}>
                          <motion.div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200 group relative"
                            whileTap={{ scale: 0.9 }}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="absolute left-full ml-2 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-azarmehr rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8 group-hover:opacity-100 transition-opacity duration-200">
                              {item.name}
                            </span>
                          </motion.div>
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  {/* Divider */}
                  <motion.div 
                    variants={mobileItemVariants}
                    className="w-6 h-px bg-border my-0.5" 
                  />

                  {/* Dark Mode Toggle */}
                  {mounted && (
                    <motion.div variants={mobileItemVariants}>
                      <motion.button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-200"
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence mode="wait">
                          {isDark ? (
                            <motion.div
                              key="moon"
                              initial={{ rotate: -90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              exit={{ rotate: 90, scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Moon className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="sun"
                              initial={{ rotate: 90, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              exit={{ rotate: -90, scale: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Sun className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.a
                    href="tel:+989123456789"
                    variants={mobileItemVariants}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-cta text-cta-foreground shadow-fluent-4"
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
