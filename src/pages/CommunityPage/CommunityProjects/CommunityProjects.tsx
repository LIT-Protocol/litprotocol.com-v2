import { Container } from 'src/components'

import ProjectItem from './ProjectItem'

import styles from './community-projects.module.scss'

import OrbisClubImg from './assets/orbis-club.png'
import HeadlineImg from './assets/headline.png'
import GathertownImg from './assets/gathertown.png'
import CaskImg from './assets/cask.svg'
import VaynerSportsImg from './assets/vaynersports.jpeg'
import CharmverseImg from './assets/charmverse.png';
import MonaImg from './assets/mona.png';
import LensImg from './assets/lensProtocol.svg';
import KrebitImg from './assets/krebit.png';
import PartifulImg from './assets/partiful.png';

const PROJECTS = [
  {
    name: 'Orbis Club',
    description: 'A fully decentralized social layer for the internet that any developers can use to build their own social apps or features',
    image: OrbisClubImg,
    link: 'https://orbis.club/'
  },
  {
    name: 'Headline',
    description: 'A decentralized publishing platform',
    image: HeadlineImg,
    link: 'https://viaheadline.xyz/'
  },
  {
    name: 'Gathertown',
    description: 'A way to meet online',
    image: GathertownImg,
    link: 'https://www.gather.town/'
  },
  {
    name: 'Cask',
    description: 'Cask is a decentralized non-custodial protocol for managing automated money flows in web3',
    image: CaskImg,
    link: 'https://www.cask.fi'
  },
  {
    name: 'VaynerSports',
    description: 'Innovative solutions for a high profile collection of the best athletes and brands in the world',
    image: VaynerSportsImg,
    link: 'https://vaynersports.com/'
  },
  {
    name: 'Charmverse',
    description: 'Web3 Native All-in-one Workspace',
    image: CharmverseImg,
    link: 'https://www.charmverse.io/'
  },
  {
    name: 'Mona',
    description: 'Build, mint, and sell metaverse worlds',
    image: MonaImg,
    link: 'https://monaverse.com/'
  },
  {
    name: 'Lens Protocol',
    description: 'User-owned, open social graph that any application can plug into',
    image: LensImg,
    link: 'https://www.lens.xyz/'
  },
  {
    name: 'Krebit',
    description: 'Your reputation passport for better job matching',
    image: KrebitImg,
    link: 'https://krebit.id/'
  },
  {
    name: 'Partiful',
    description: 'The most memorable parties are planned on Partiful',
    image: PartifulImg,
    link: 'https://partiful.com/'
  },
]

const CommunityProjects = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.top}>
          <div className={styles.title}>Projects using Lit</div>

          <a href="https://airtable.com/shr2NWJbH1Y6Y3kOU">Reach Out To Get Listed</a>
        </div>

        <div className={styles.projects}>
          {PROJECTS.map((project, i) => (
            <ProjectItem key={i} {...project} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default CommunityProjects