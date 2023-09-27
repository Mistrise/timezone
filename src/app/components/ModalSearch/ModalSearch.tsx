import styles from './ModalSearch.module.css'

const ModalSearch = () => {
  return (
      <form className={styles.modal__search__form}>
          <input className={styles.modal__search__input} type="text" name={'cities_search_field'} placeholder={'Enter city'}/>
      </form>
  )
}

export default ModalSearch