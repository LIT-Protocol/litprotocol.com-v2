'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const glowAnimation = {
    initial: {
      '--glow-color-1': '#00000000',
      '--glow-color-2': '#00000000',
      '--glow-color-3': '#00000000',
      opacity: 0,
    } as any,
    animate: {
      '--glow-color-1': '#3b82f6',
      '--glow-color-2': '#1e3a8a66',
      '--glow-color-3': '#0f172a',
      opacity: 1,
      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
      },
    } as any,
  };
  

  const barAnimation = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

export default function HeroBackgroundGlow({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0, duration: .5 }}
      className={cn(
        'absolute -top-[8rem] md:-top-[3.5rem] left-1/2 -translate-x-1/2 w-full h-[78.625rem]',
        'origin-left pointer-events-none z-0',
        className
      )}
    >
      {/* Animated center radial glow using Tailwind-defined color values */}
      <motion.div
        variants={glowAnimation}
        initial="initial"
        animate="animate"
        transition={{
          duration: .5,
          ease: [0.22, .2, 0.36, .1],
        }}
        className="absolute inset-0 blur-1xl mix-blend-soft-light hero-glow-gradient"
      />

      {/* Left-side accent glow */}
      <div className="w-1/2 h-[78.625rem] absolute left-0 top-0 bg-conic-[from_90deg_at_57%_50%] from-blue-900 via-blue-950 via-65deg to-light-bar-blue to-252deg mix-blend-soft-light" />

      {/* Right-side flipped accent glow */}
      <div className="w-1/2 h-[78.625rem] absolute left-full top-[78.625rem] origin-top-left rotate-180 bg-conic-[from_90deg_at_57%_50%] from-light-bar-blue via-blue-950 via-65deg to-blue-900 to-252deg mix-blend-soft-light" />

      {/* Base vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-sky-950/0 to-coal-950" />
    </motion.div>
  );
}
