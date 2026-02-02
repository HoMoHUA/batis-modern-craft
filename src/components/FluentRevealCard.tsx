import { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface FluentRevealCardProps {
  children: ReactNode;
  className?: string;
  lightColor?: string;
  lightSize?: number;
  borderLight?: boolean;
}

const FluentRevealCard = ({
  children,
  className = "",
  lightColor = "rgba(255, 255, 255, 0.15)",
  lightSize = 600,
  borderLight = true,
}: FluentRevealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cursorX = ((e.clientX - rect.left) / rect.width) * 100;
    const cursorY = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPosition({ x: cursorX, y: cursorY });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
    >
      {/* Windows 10 Fluent Design - Cursor Light Effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-[20px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Radial gradient light that follows cursor */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${lightSize}px circle at ${cursorPosition.x}% ${cursorPosition.y}%, ${lightColor}, transparent 40%)`,
          }}
        />
        {/* Border light effect */}
        {borderLight && (
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              background: `radial-gradient(${lightSize * 0.6}px circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(255, 255, 255, 0.5), transparent 40%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />
        )}
      </motion.div>

      {children}
    </div>
  );
};

export default FluentRevealCard;
