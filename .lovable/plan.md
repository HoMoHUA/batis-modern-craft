

# طراحی لندینگ پیج سبک هواوی برای باتیس مدرن

## خلاصه پروژه

پیاده‌سازی ۶ ویژگی اصلی لندینگ‌های هواوی به همراه هدر شناور خاص که پس از اسکرول به سمت راست صفحه می‌چسبد.

---

## بخش ۱: هدر دوحالته (Normal + Floating Sidebar)

### رفتار مورد نظر:
- **حالت اول (بالای صفحه):** هدر معمولی در بالای صفحه
- **حالت دوم (پس از اسکرول):** هدر به صورت عمودی در سمت راست صفحه قرار می‌گیرد با پس‌زمینه blur شده

### تغییرات فایل `Header.tsx`:

```text
+-----------------------------------------------------+
|  Logo    Navigation Links          Phone  CTA      |  <-- حالت اولیه
+-----------------------------------------------------+

        +--------+
        |  Logo  |
        |   |    |
        | Nav 1  |
        | Nav 2  |  <-- حالت شناور (پس از scroll 100px)
        | Nav 3  |      با انیمیشن slide از راست
        |   |    |
        |  CTA   |
        +--------+
             ^
             |
          سمت راست صفحه
```

---

## بخش ۲: Hero Section سینمایی با Parallax

### ویژگی‌ها:
- تایپوگرافی بسیار بزرگ (7xl-9xl)
- افکت Parallax روی تصویر پس‌زمینه (با useScroll از framer-motion)
- انیمیشن ورود سینمایی با تاخیر stagered
- افکت fade در scroll

### پیاده‌سازی:
```typescript
const { scrollY } = useScroll();
const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
const opacity = useTransform(scrollY, [0, 400], [1, 0]);
const scale = useTransform(scrollY, [0, 400], [1, 1.1]);
```

---

## بخش ۳: انیمیشن‌های Scroll-Based (چرخش/زوم)

### کامپوننت جدید: `ScrollRevealSection.tsx`

برای نمایش محصولات با افکت‌های scroll-triggered:
- چرخش 3D محصول هنگام اسکرول
- زوم تدریجی
- Fade-in با translate

```typescript
// برای هر محصول
const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
```

---

## بخش ۴: Sticky Scroll Sections

### کامپوننت جدید: `StickyFeatureSection.tsx`

بخش ویژگی‌ها با تصویر ثابت و متن اسکرول شونده:

```text
+------------------------+------------------------+
|                        |                        |
|     تصویر محصول        |    ویژگی ۱            |
|     (position: sticky) |                        |
|                        +------------------------+
|                        |                        |
|     می‌ماند ثابت        |    ویژگی ۲            |
|                        |                        |
|                        +------------------------+
|                        |                        |
|                        |    ویژگی ۳            |
|                        |                        |
+------------------------+------------------------+
```

### ویژگی‌ها:
- تصویر با `position: sticky` و `top: 20%`
- هر ویژگی با ارتفاع `100vh`
- تغییر تصویر با progress اسکرول
- انیمیشن highlight روی ویژگی فعال

---

## بخش ۵: میکرو انیمیشن‌های Fluent UI پیشرفته

### افزودن به `index.css`:

```css
/* Magnetic Button Effect */
.magnetic-button {
  transition: transform 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
}

/* Scroll Progress Indicator */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-cta);
  transform-origin: 0%;
}

/* Smooth Page Transitions */
.page-transition {
  animation: pageEnter 0.8s cubic-bezier(0.1, 0.9, 0.2, 1);
}

/* Reveal on Scroll with 3D */
.reveal-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}
```

---

## بخش ۶: 3D Product Reveals

### ویرایش `ProductsSection.tsx`:

```typescript
// افکت 3D برای کارت محصول
const cardVariants = {
  hidden: { 
    rotateX: 15,
    rotateY: -15,
    opacity: 0,
    scale: 0.9
  },
  visible: {
    rotateX: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1
  }
};

// استفاده از perspective برای عمق
<motion.div style={{ perspective: 1000 }}>
  <motion.div 
    variants={cardVariants}
    whileHover={{ 
      rotateY: 5, 
      rotateX: -5,
      z: 50 
    }}
  />
</motion.div>
```

---

## بخش ۷: Page Transitions و Scroll Progress

### کامپوننت جدید: `ScrollProgress.tsx`

نوار پیشرفت در بالای صفحه:

```typescript
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-cta z-[100]"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  );
};
```

---

## جزئیات فنی پیاده‌سازی

### فایل‌های جدید:
1. `src/components/ScrollProgress.tsx` - نوار پیشرفت اسکرول
2. `src/components/StickyFeatureSection.tsx` - بخش sticky برای ویژگی‌ها
3. `src/hooks/useScrollAnimation.ts` - هوک سفارشی برای انیمیشن اسکرول

### فایل‌های ویرایشی:
1. `src/components/Header.tsx` - هدر دوحالته
2. `src/components/HeroSection.tsx` - hero سینمایی با parallax
3. `src/components/ProductsSection.tsx` - کارت‌های 3D
4. `src/components/QualitySection.tsx` - افکت‌های scroll-reveal
5. `src/index.css` - استایل‌های جدید
6. `src/pages/Index.tsx` - اضافه کردن کامپوننت‌های جدید

### وابستگی‌ها:
- `framer-motion` (موجود) - برای useScroll, useTransform, useSpring

---

## نمونه کد هدر شناور

```typescript
// Header.tsx - حالت شناور
const [isFloating, setIsFloating] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsFloating(window.scrollY > 100);
  };
  // ...
}, []);

return (
  <>
    {/* هدر معمولی - فقط وقتی scroll < 100 */}
    <AnimatePresence>
      {!isFloating && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 right-0 left-0 z-50"
        >
          {/* ... محتوای هدر معمولی */}
        </motion.header>
      )}
    </AnimatePresence>

    {/* هدر شناور عمودی - فقط وقتی scroll > 100 */}
    <AnimatePresence>
      {isFloating && (
        <motion.nav
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50
                     glass-header rounded-2xl p-4 flex flex-col gap-4"
        >
          {/* لوگو */}
          <div className="w-12 h-12 bg-primary rounded-xl" />
          
          {/* لینک‌های navigation عمودی */}
          {navItems.map(item => (
            <a href={item.href} className="p-3 rounded-lg hover:bg-accent/10">
              <item.icon className="w-5 h-5" />
            </a>
          ))}
          
          {/* دکمه CTA */}
          <Button variant="cta" size="icon" />
        </motion.nav>
      )}
    </AnimatePresence>
  </>
);
```

---

## ترتیب اجرا

1. ایجاد هوک `useScrollAnimation`
2. ویرایش `Header.tsx` برای حالت شناور
3. ویرایش `HeroSection.tsx` با parallax
4. ایجاد `ScrollProgress.tsx`
5. ایجاد `StickyFeatureSection.tsx`
6. ویرایش `ProductsSection.tsx` با 3D
7. ویرایش `QualitySection.tsx` با scroll-reveal
8. به‌روزرسانی `index.css` با استایل‌های جدید
9. به‌روزرسانی `Index.tsx`

