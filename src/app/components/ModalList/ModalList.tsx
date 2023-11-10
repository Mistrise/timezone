import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";



const ModalList = () => {
    const { isPending, error, data }  = useQuery<any>({
        queryKey: ['cities'],
        queryFn: () => {
            return axios.get<string[]>('https://worldtimeapi.org/api/timezones').then(res => res.data)
        },
    })

    if (isPending) return <div>Loading</div>

    if (error) return <div>An error occurred: {error.message}</div>


    return (
        <div className={styles.modal__list}>
            {data.map((city: any, index: number) => <ModalListItem key={index} city={city}/>)}
        </div>
    )
}

export default ModalList