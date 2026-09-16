import {
  comparisons,
  comparisonHref,
  type Category,
} from '@/content/comparisons';

import styles from './comparisons.module.css';

export default function ComparisonLinks({ category }: { category: Category }) {
  return (
    <nav
      aria-label={
        category === 'wallets'
          ? 'Wallet infrastructure comparisons'
          : 'Private compute comparisons'
      }
      className={styles.related}
    >
      <p>
        {category === 'wallets'
          ? 'Compare wallet infrastructure'
          : 'Compare private compute'}
      </p>
      <div>
        {comparisons
          .filter(item => item.category === category)
          .map(item => (
            <a
              key={item.slug}
              href={comparisonHref(item.slug)}
            >
              Lit vs {item.provider} <span aria-hidden="true">→</span>
            </a>
          ))}
      </div>
    </nav>
  );
}
