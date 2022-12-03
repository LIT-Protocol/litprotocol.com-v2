import { Helmet } from 'react-helmet'

import cx from 'classnames'

import styles from './template-wrapper.module.scss'
import ogCard from './assets/ogCard.png'
import twitterCard from './assets/twitterCard.png'

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
        <meta property="og:image" content={ogCard} />
        <meta property="twitter:image" content={twitterCard} />
      </Helmet>
      <div className={styles.wrapper}>{children}</div>
    </>
  )
}

export default TemplateWrapper
