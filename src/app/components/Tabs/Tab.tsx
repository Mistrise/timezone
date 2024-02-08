import styles from './Tab.module.css'
import {useTimeStore} from "@/app/store";

interface Props {
    elem1: string
    elem2: string
}

const Tab = ({elem1, elem2}: Props) => {
    const setToggleTimeFormat = useTimeStore(state => state.setToggleTimeFormat)
    const toggleTimeFormat = useTimeStore(state => state.toggleTimeFormat)


  return (
      <div className={styles.switch} onClick={() => setToggleTimeFormat(!toggleTimeFormat)}>
          {toggleTimeFormat ?
              <>
                  <div className={styles.tab__active}>{elem1}</div>
                  <div className={styles.tab}>{elem2}</div>
              </>
              :
              <>
                  <div className={styles.tab}>{elem1}</div>
                  <div className={styles.tab__active}>{elem2}</div>
              </>
          }
      </div>

  )
}

export default Tab