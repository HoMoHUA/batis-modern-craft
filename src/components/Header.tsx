import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Home, Package, Sparkles, Image, Ruler, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

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
    { name: "صفحه اصلی", href: "#hero", icon: Home },
    { name: "محصولات", href: "#products", icon: Package },
    { name: "کیفیت", href: "#quality", icon: Sparkles },
    { name: "گالری", href: "#gallery", icon: Image },
    { name: "سفارش سفارشی", href: "#custom", icon: Ruler },
  ];

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
                <motion.a
                  href="#"
                  className="flex items-center gap-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-steel rounded-lg flex items-center justify-center shadow-fluent-4 group-hover:shadow-fluent-8 transition-shadow duration-300">
                    <span className="text-primary-foreground font-azarmehr-bold text-lg">ب</span>
                  </div>
                  <span className="font-azarmehr-bold text-xl text-primary">
                    باتیس مدرن
                  </span>
                </motion.a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-azarmehr font-medium link-underline py-1"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                  <motion.a
                    href="tel:+989123456789"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                    <Button variant="cta" size="sm" className="font-azarmehr">
                      مشاوره رایگان
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="md:hidden p-2 text-primary glass rounded-lg"
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

            {/* Mobile Menu - Glassmorphism */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, height: "auto", backdropFilter: "blur(20px)" }}
                  exit={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
                  className="md:hidden glass-card border-t-0 rounded-b-2xl mx-4 overflow-hidden"
                >
                  <nav className="p-6 flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="text-foreground hover:text-accent hover:bg-accent/10 transition-all py-3 px-4 font-azarmehr font-medium rounded-lg flex items-center gap-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </motion.a>
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
                      <Button variant="cta" className="w-full font-azarmehr">
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

      {/* Floating Sidebar Header - Visible when scrolled */}
      <AnimatePresence>
        {isFloating && (
          <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.1, 0.9, 0.2, 1],
              staggerChildren: 0.05
            }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 glass-header rounded-2xl p-3 flex flex-col items-center gap-2 shadow-fluent-16 hidden md:flex"
          >
            {/* Logo */}
            <motion.a
              href="#hero"
              className="w-12 h-12 bg-gradient-to-br from-primary to-steel rounded-xl flex items-center justify-center mb-2 shadow-fluent-4 hover:shadow-fluent-8 transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              <span className="text-primary-foreground font-azarmehr-bold text-lg">ب</span>
            </motion.a>

            {/* Divider */}
            <div className="w-8 h-px bg-border my-1" />

            {/* Navigation Icons */}
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all duration-300 group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, x: 50 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 200 }}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <motion.span
                  className="absolute right-full mr-3 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-azarmehr rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-fluent-8"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-8 h-px bg-border my-1" />

            {/* CTA Button */}
            <motion.a
              href="tel:+989123456789"
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-cta text-cta-foreground hover:scale-110 transition-transform shadow-fluent-4"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button */}
      <AnimatePresence>
        {isFloating && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed bottom-6 left-6 z-50 md:hidden w-14 h-14 bg-cta text-cta-foreground rounded-full shadow-fluent-16 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Floating Menu */}
      <AnimatePresence>
        {isFloating && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.1, 0.9, 0.2, 1] }}
            className="fixed bottom-24 left-6 z-50 md:hidden glass-header rounded-2xl p-4 shadow-fluent-16"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 rounded-xl transition-all font-azarmehr"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
