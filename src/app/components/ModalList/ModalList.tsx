import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useMemo} from "react";
import {useTimeStore} from "@/app/store";

interface Props {
    modalInput: string
}

const ModalList = ({modalInput}: Props) => {
    const timezonesMap = useTimeStore(state => state.timezonesMap)
    const timeZones = useMemo(() => {
        return Object.values(timezonesMap).filter(({zoneName}) => zoneName.toLowerCase().includes(modalInput.toLowerCase()))
    }, [timezonesMap, modalInput])

    return (
        <div className={styles.modal__list}>
            {timeZones.map((timeZone) => <ModalListItem key={timeZone.zoneName} timeZone={timeZone}/>)}
        </div>
    )
}

export default ModalList