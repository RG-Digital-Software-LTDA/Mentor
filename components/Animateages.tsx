"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedPagesProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedPages({ children, className = "", delay = 0 }: AnimatedPagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInAnimation({ children, className = "", delay = 0 }: AnimatedPagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideUpAnimation({ children, className = "", delay = 0 }: AnimatedPagesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}