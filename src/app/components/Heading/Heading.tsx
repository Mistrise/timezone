import styles from './Heading.module.css'

const Heading = () => {
  return (
      <div className={styles.heading_container}>
          <h1 className={styles.heading_title}>Time Hub</h1>
          <h2 className={styles.heading_text}>Time Zone Converter</h2>
      </div>
  )
}

export default Heading