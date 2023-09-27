import styles from './ModalSearch.module.css'

interface Props {
    modalInput: string
    setModalInput: (input: string) => void
}


const ModalSearch = ({modalInput, setModalInput}: Props) => {

  return (
      <form className={styles.modal__search__form}>
          <input
              className={styles.modal__search__input}
              type="text" name={'cities_search_field'}
              placeholder={'Enter city'}
              onChange={(event) => setModalInput(event.target.value) }/>
      </form>
  )
}

export default ModalSearch