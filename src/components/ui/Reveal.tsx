'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './reveal.module.css';

/**
 * Subtle scroll-reveal: fades + rises content as it enters the viewport, once.
 * Respects prefers-reduced-motion (renders children with no animation).
 */
const Reveal = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={styles.reveal}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
