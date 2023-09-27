import styles from './Button.module.css'
import Image from "next/image";
import Plus from '../../../../public/icons/Icon=plus.svg'

interface Props {
    showSearch: boolean
    setShowSearch: (search: boolean) => void
}

const Button = ({setShowSearch, showSearch}: Props) => {
  return (
      <button className={styles.button} onClick={() => setShowSearch(!showSearch)}>
        <Image src={Plus} alt=''></Image>
      </button>
  )
}

export default Button