import {
  comparisons,
  comparisonHref,
  type Category,
} from '@/content/comparisons';

export default function ComparisonLinks({ category }: { category: Category }) {
  return (
    <nav
      aria-label={
        category === 'wallets'
          ? 'Wallet infrastructure comparisons'
          : 'Private compute comparisons'
      }
      className="mt-12 border-t border-white/10 pt-6 text-left"
    >
      <p className="text-sm text-white/55">
        {category === 'wallets'
          ? 'Compare wallet infrastructure'
          : 'Compare private compute'}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-7 gap-y-1">
        {comparisons
          .filter(item => item.category === category)
          .map(item => (
            <a
              key={item.slug}
              href={comparisonHref(item.slug)}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Lit vs {item.provider} <span aria-hidden="true">→</span>
            </a>
          ))}
      </div>
    </nav>
  );
}
