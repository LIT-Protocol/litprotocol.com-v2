import { Helmet } from 'react-helmet'

import cx from 'classnames'

import styles from './template-wrapper.module.scss'

interface TemplateWrapperProps {
  template?: string
}

const TemplateWrapper = (
  props: React.PropsWithChildren<TemplateWrapperProps>,
) => {
  const { children, template } = props

  const origin = window.location.origin

  return (
    <>
      <Helmet>
        <meta property="og:image" content={`${origin}/images/ogCard.png`} />
        <meta
          property="twitter:image"
          content={`${origin}/images/twitterCard.png`}
        />
      </Helmet>
      <div className={styles.wrapper}>{children}</div>
    </>
  )
}

export default TemplateWrapper
