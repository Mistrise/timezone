import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {useEffect, useState} from "react";
import {City} from "@/app/store";
import {debouncedSearch, search} from "@/fetchers/cities";
import {useUpdateEffect} from "@/helpers/useUpdateEffect";

interface Props {
  modalInput: string
}

const ModalList = ({modalInput}: Props) => {
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    search(modalInput).then((data) => setCities(data.results))
  }, []);

  useUpdateEffect(() => {
    debouncedSearch(modalInput).then((data) => setCities(data.results))
  }, [modalInput]);

  return (
    <div className={styles.modal__list}>
      {cities.map((city) => <ModalListItem key={city.geoname_id} city={city}/>)}
    </div>
  )
}

export default ModalList