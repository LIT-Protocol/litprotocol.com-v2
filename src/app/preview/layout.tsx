import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <>{children}</>;
}
