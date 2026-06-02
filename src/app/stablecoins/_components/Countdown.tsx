'use client';

import { useEffect, useState } from 'react';

// GENIUS Act takes effect Jan 18, 2027 (18 months after the July 18, 2025 signing).
const TARGET = new Date('2027-01-18T00:00:00-05:00').getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins: Math.floor((diff % 3_600_000) / 60_000),
    secs: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

export default function Countdown({ compact = false }: { compact?: boolean }) {
  // null until mounted to avoid SSR/client hydration mismatch on a time value
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (compact) {
    return (
      <span
        suppressHydrationWarning
        className="metric-1 font-mono font-semibold tabular-nums tracking-tight"
      >
        {t ? `${t.days} days · ${pad(t.hours)}:${pad(t.mins)}:${pad(t.secs)}` : '— days'}
      </span>
    );
  }

  const units: [string, string][] = [
    ['Days', t ? pad(t.days, 3) : '000'],
    ['Hours', t ? pad(t.hours) : '00'],
    ['Minutes', t ? pad(t.mins) : '00'],
    ['Seconds', t ? pad(t.secs) : '00'],
  ];

  return (
    <div
      className="flex items-end gap-3 sm:gap-5 md:gap-8 flex-wrap"
      role="timer"
      aria-label="Countdown to GENIUS Act enforcement on January 18, 2027"
      suppressHydrationWarning
    >
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-stretch gap-3 sm:gap-5 md:gap-8">
          <div className="flex flex-col items-center gap-2">
            <span
              className="metric-1 font-mono font-semibold tabular-nums leading-none tracking-tight text-[clamp(2.75rem,9vw,6.5rem)] drop-shadow-[0_0_32px_oklch(53.51%_0.163_39.51/0.35)]"
              suppressHydrationWarning
            >
              {value}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-white/40">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="hidden sm:block font-mono font-light text-lit-orange-700/70 leading-none text-[clamp(2rem,7vw,5rem)] pb-7 self-start">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
