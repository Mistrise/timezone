import {City} from "@/app/page";
import styles from './ModalListItem.module.css'

interface Props {
  city: City
}

const ModalListItem = ({city}: Props) => {
  return (
      <div className={styles.modalListItem}>
        {city.city}
        {city.timezone}
      </div>
  )
}

export default ModalListItem