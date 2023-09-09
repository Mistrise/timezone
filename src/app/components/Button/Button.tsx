import styles from './Button.module.css'
import {ReactNode} from "react";

interface Props {
  children: ReactNode
}

const Button = ({children}: Props) => {
  return (
      <button className={styles.button}>
        {children}
      </button>
  )
}

export default Button