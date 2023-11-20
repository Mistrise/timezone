import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface Props {
    modalInput: string
}

const ModalList = ({modalInput}: Props) => {
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
            { modalInput !== ''
                ?
                data.filter((city: any) => city.toLowerCase().includes(modalInput.toLowerCase()))
                    .map((city: any) => <ModalListItem key={city} city={city}/>)
                :
                data.map((city: any) => <ModalListItem key={city} city={city}/>)
            }
        </div>
    )
}

export default ModalList