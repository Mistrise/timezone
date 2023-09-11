import styles from './Tab.module.css'

interface Props {
    elem1: string
    elem2: string
}

const Tab = ({elem1, elem2}: Props) => {
  return (
      <div className={styles.switch}>
           <div className={styles.switch__active}>{elem1}</div>
           <div>{elem2}</div>
      </div>

  )
}

export default Tab