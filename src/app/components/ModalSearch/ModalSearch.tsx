import styles from './ModalSearch.module.css'

interface Props {
    setModalInput: (input: string) => void
}


const ModalSearch = ({setModalInput}: Props) => {

  return (
      <form className={styles.modal__search__form}>
          <input
              className={styles.modal__search__input}
              type="text" name={'cities_search_field'}
              placeholder={'Enter city'}
              autoFocus={true}
              onChange={(event) => setModalInput(event.target.value.replace(' ', '_')) }/>
      </form>
  )
}

export default ModalSearch