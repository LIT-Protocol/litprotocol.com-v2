import {
  comparisons,
  comparisonHref,
  categoryInfo,
  type Category,
} from '@/content/comparisons';

import styles from './comparisons.module.css';

export default function ComparisonLinks({ category }: { category: Category }) {
  const info = categoryInfo(category);
  return (
    <nav aria-label={`${info.title} comparisons`} className={styles.related}>
      <p>{info.links}</p>
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
