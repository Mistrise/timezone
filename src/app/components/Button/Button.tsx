import styles from './Button.module.css'
import Image from "next/image";
import Plus from '../../../../public/icons/Icon=plus.svg'


const Button = () => {
  return (
      <button className={styles.button}>
        <Image src={Plus} alt=''></Image>
      </button>
  )
}

export default Button