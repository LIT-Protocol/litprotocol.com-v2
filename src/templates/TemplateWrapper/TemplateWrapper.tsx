import { Helmet } from 'react-helmet'

import cx from 'classnames'

import styles from './template-wrapper.module.scss'
import ogImage from './og-card.png'
import twitterImage from './twitter-card.png'

interface TemplateWrapperProps {
  template?: string
}

const TemplateWrapper = (
  props: React.PropsWithChildren<TemplateWrapperProps>,
) => {
  const { children, template } = props

  return (
    <>
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={twitterImage} />
      </Helmet>
      <div className={styles.wrapper}>{children}</div>
    </>
  )
}

export default TemplateWrapper
