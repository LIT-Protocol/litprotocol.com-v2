'use client';

import Link from 'next/link';

export function PrototypeSwitcher({ current }: { current: 1 | 2 | 3 }) {
  const items: Array<{ id: 1 | 2 | 3; label: string }> = [
    { id: 1, label: '01 · Read. Compute. Write.' },
    { id: 2, label: '02 · The Programmable Oracle' },
    { id: 3, label: '03 · Cross-Chain, Cross-API' },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 p-1.5">
      {items.map((it) => (
        <Link
          key={it.id}
          href={`/prototypes/${it.id}`}
          className={`px-3 py-1.5 text-xs rounded-full transition ${
            current === it.id
              ? 'bg-lit-orange text-white'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          {it.label}
        </Link>
      ))}
      <Link
        href="/prototypes"
        className="px-3 py-1.5 text-xs rounded-full text-white/50 hover:text-white hover:bg-white/5 transition"
      >
        Index
      </Link>
    </div>
  );
}

export function MonoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/60 border border-white/15 rounded-full px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-mint-500" />
      {children}
    </span>
  );
}
