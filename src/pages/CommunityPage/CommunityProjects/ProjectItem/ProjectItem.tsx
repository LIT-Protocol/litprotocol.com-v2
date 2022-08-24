import styles from './project-item.module.scss'

interface ProjectItemProps {
    name: string
    description: string
    image: string
}

const ProjectItem = (props: ProjectItemProps) => {
  const { name, description, image } = props

  return (
    <div className={styles.wrapper}>
        <div className={styles.name}>
            {name}
        </div>

        <div className={styles.logo}>
            <img src={image} />
        </div>

        <div className={styles.description}>
            {description}
        </div>
    </div>
  )
}

export default ProjectItem