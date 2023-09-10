import {ReactNode} from "react";
import styles from './Tabs.module.css'

interface Props {
    children: ReactNode
}

const Tabs = () => {
  return (
      <div className={styles.tab}>
          <p className={styles.tabSide}>left</p>
          <p className={styles.tabSide}>right</p>
      </div>
  )
}

export default Tabs