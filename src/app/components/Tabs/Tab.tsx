import styles from './Tab.module.css'


interface Props {
    elem1: string
    elem2: string
    setState: (prevState: boolean) => void
    prevState: boolean
}

const Tab = ({elem1, elem2, setState, prevState}: Props) => {
    const changeTimeToggle = () => {
        // @ts-ignore
        const data = JSON.parse(localStorage.getItem('timeToggle'))
        if (data === true) {
            localStorage.setItem('timeToggle', JSON.stringify(!data))
        } else if (data === false) {
            localStorage.setItem('timeToggle', JSON.stringify(!data))
        }
    }
  return (
      <div className={styles.switch} onClick={() => {
          setState(!prevState)
          changeTimeToggle()
      }}>
          {/*@ts-ignore*/}
          {JSON.parse(localStorage.getItem('timeToggle')) ?
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