import { Icons } from 'src/components'

import styles from './project-item.module.scss'

interface ProjectItemProps {
    name: string
    description: string
    image: string
    link: string
}

const ProjectItem = (props: ProjectItemProps) => {
  const { name, description, image, link } = props

  return (
    <a href={link} target={"_blank"} className={styles.wrapper}>
        <div className={styles.name}>
            {name}
            <Icons.Arrow />
        </div>

        <div className={styles.logo}>
            <img src={image} />
        </div>

        <div className={styles.description}>
            {description}
        </div>
    </a>
  )
}

export default ProjectItem