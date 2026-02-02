import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Home, Package, Sparkles, Image, Ruler, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setIsFloating(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "صفحه اصلی", href: "/", hash: "#hero", icon: Home },
    { name: "محصولات", href: "/", hash: "#products", icon: Package },
    { name: "کیفیت", href: "/", hash: "#quality", icon: Sparkles },
    { name: "گالری", href: "/", hash: "#gallery", icon: Image },
    { name: "سفارش سفارشی", href: "/", hash: "#custom", icon: Ruler },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (location.pathname === "/") {
      // On home page, scroll to section
      const element = document.querySelector(item.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const isDark = mounted && theme === "dark";

  // Animation for floating header - from top to right side
  const floatingVariants = {
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
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0, y: -20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 15 }
    }
  };

  const ThemeButton = ({ className = "" }: { className?: string }) => (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-10 h-10 rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 relative overflow-hidden ${className}`}
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
            <Moon className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

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

      {/* Floating Sidebar Header - RIGHT side, vertically centered */}
      <AnimatePresence>
        {isFloating && (
          <motion.nav
            variants={floatingVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 glass-header rounded-[20px] p-3 flex flex-col items-center gap-2 shadow-fluent-16 hidden md:flex"
          >
            {/* Logo */}
            <Link to="/">
              <motion.div
                variants={itemVariants}
                className="w-12 h-12 bg-gradient-to-br from-accent to-cta rounded-[20px] flex items-center justify-center mb-2 shadow-fluent-4 hover:shadow-fluent-8 transition-shadow"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-primary-foreground font-azarmehr-bold text-lg">ص</span>
              </motion.div>
            </Link>

            {/* Divider */}
            <motion.div variants={itemVariants} className="w-8 h-px bg-border my-1" />

            {/* Navigation Icons */}
            {navItems.map((item) => (
              <motion.div key={item.name}>
                {item.href === "/" && location.pathname === "/" ? (
                  <motion.a
                    href={item.hash}
                    variants={itemVariants}
                    className="w-10 h-10 rounded-[20px] flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 group relative"
                    whileHover={{ scale: 1.15, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="absolute left-full ml-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-azarmehr rounded-[20px] opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8 group-hover:opacity-100 transition-opacity duration-200">
                      {item.name}
                    </span>
                  </motion.a>
                ) : (
                  <Link to={item.href + item.hash}>
                    <motion.div
                      variants={itemVariants}
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
            <motion.div variants={itemVariants} className="w-8 h-px bg-border my-1" />

            {/* Dark Mode Toggle */}
            {mounted && (
              <motion.div variants={itemVariants}>
                <ThemeButton />
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.a
              href="tel:+989123456789"
              variants={itemVariants}
              className="w-10 h-10 rounded-[20px] flex items-center justify-center bg-cta text-cta-foreground shadow-fluent-4"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button - RIGHT side for RTL with safe area */}
      <AnimatePresence>
        {isFloating && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed bottom-4 right-4 z-50 md:hidden w-12 h-12 sm:w-14 sm:h-14 bg-cta text-cta-foreground rounded-2xl sm:rounded-[20px] shadow-fluent-16 flex items-center justify-center"
            style={{
              marginBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              marginRight: 'max(env(safe-area-inset-right, 0px), 16px)',
            }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Floating Menu - RIGHT side with safe area */}
      <AnimatePresence>
        {isFloating && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-20 right-4 z-50 md:hidden glass-header rounded-2xl sm:rounded-[20px] p-3 sm:p-4 shadow-fluent-16 max-w-[calc(100vw-2rem)]"
            style={{
              marginBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              marginRight: 'max(env(safe-area-inset-right, 0px), 16px)',
            }}
          >
            <nav className="flex flex-col gap-1 sm:gap-2">
              {navItems.map((item, index) => (
                <motion.div key={item.name}>
                  {item.href === "/" && location.pathname === "/" ? (
                    <motion.a
                      href={item.hash}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground hover:text-accent hover:bg-accent/10 rounded-xl sm:rounded-[20px] transition-all font-azarmehr"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      {item.name}
                    </motion.a>
                  ) : (
                    <Link
                      to={item.href + item.hash}
                      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground hover:text-accent hover:bg-accent/10 rounded-xl sm:rounded-[20px] transition-all font-azarmehr"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              {/* Mobile Theme Toggle in Floating Menu */}
              {mounted && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground hover:text-accent hover:bg-accent/10 rounded-xl sm:rounded-[20px] transition-all font-azarmehr cursor-pointer"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <Moon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />}
                  {isDark ? "حالت روشن" : "حالت تاریک"}
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
