import { Helmet } from 'react-helmet'

import { BasicTemplate } from 'src/templates'
import { PUBLIC_PATHS } from 'src/config'

import CommunityProjects from './CommunityProjects'
import CommunityQuote from './CommunityQuote'
import CommunityReady from './CommunityReady'
import CommunitySlider from './CommunitySlider'

import styles from './community-page.module.scss'

const CommunityPage = () => {
  return (
    <BasicTemplate color="basic">
      <Helmet>
        <title>Community | Lit Protocol</title>
        <meta
          property="og:url"
          content={`https://litprotocol.com/${PUBLIC_PATHS.COMMUNITY}`}
        />
        <meta property="og:title" content="Community | Lit Protocol" />
        <meta
          property="twitter:url"
          content={`https://litprotocol.com/${PUBLIC_PATHS.COMMUNITY}`}
        />
        <meta property="twitter:title" content="Community | Lit Protocol" />
      </Helmet>
      <h1 className={styles.title}>Lit Community</h1>

      <CommunityProjects />
      <CommunityQuote />
      <CommunityReady />
      <CommunitySlider />
    </BasicTemplate>
  )
}

export default CommunityPage
