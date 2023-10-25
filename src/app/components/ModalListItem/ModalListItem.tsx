import styles from './ModalListItem.module.css'

interface Props {
  city: any
}

const ModalListItem = ({city}: Props) => {
    const splitCitiesAndCountries = city.split('/')
    const lengthOfCitiesArr = splitCitiesAndCountries.length
    const cityString = splitCitiesAndCountries[lengthOfCitiesArr - 1]
  return (
      <div className={styles.modal__list__item}>
          <div className={styles.modal__list__item__grid}>
              {cityString}
          </div>
      </div>
  )
}

export default ModalListItem