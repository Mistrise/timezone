import Cross from '../../../../public/icons/Icon=cross-circle.svg'
import Image from "next/image";
import styles from './SliderTimer.module.css'

interface Props {
    time: string
    setTimeElement: (state: string) => void
}

const SliderTimer = ({time, setTimeElement}: Props) => {

    return (
        <div className={styles.slider__timer}>
            <div className={styles.slider__text}>{time}</div>
                <Image src={Cross} alt={''} width={16} height={16} onClick={() => setTimeElement('')}></Image>
        </div>
    )
}

export default SliderTimer