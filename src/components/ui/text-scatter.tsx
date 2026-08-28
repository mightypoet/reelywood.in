import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface TextScatterProps {
  children: React.ReactNode;
  className?: string;
  scatterX?: number;
  scatterY?: number;
  rotation?: number;
}

export function TextScatter({
  children,
  className = "",
  scatterX = 40,
  scatterY = 40,
  rotation = 30
}: TextScatterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const text = typeof children === 'string' ? children : String(children);
  const characters = text.split('');

  return (
    <span 
      className={`inline-flex whitespace-pre flex-wrap cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((char, index) => {
        if (char === ' ') return <span key={index}> </span>;
        
        // Use consistent deterministic randoms based on index if not mounted to avoid hydration mismatch
        // Though in AI studio we only care about client side mostly, it's good practice.
        const pseudoRandom = (Math.sin(index * 10) + 1) / 2; // 0 to 1
        const pseudoRandom2 = (Math.cos(index * 10) + 1) / 2; // 0 to 1
        
        const xOffset = isHovered ? (pseudoRandom - 0.5) * 2 * scatterX : 0;
        const yOffset = isHovered ? (pseudoRandom2 - 0.5) * 2 * scatterY : 0;
        const rot = isHovered ? (pseudoRandom - 0.5) * 2 * rotation : 0;
        
        return (
          <motion.span
            key={index}
            className="inline-block"
            animate={{
              x: xOffset,
              y: yOffset,
              rotate: rot,
              color: isHovered ? "var(--color-primary)" : "inherit"
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 15,
              mass: 0.5
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
