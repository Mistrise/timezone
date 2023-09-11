import Cross from '../../../../public/icons/Icon=cross-circle.svg'
import Image from "next/image";
import styles from './SliderTimer.module.css'

const SliderTimer = () => {
    return (
        <div className={styles.slider__timer}>
            <div className={styles.slider__text}>+30 min</div>
                <Image src={Cross} alt={''} width={16} height={16}></Image>
        </div>
    )
}

export default SliderTimer