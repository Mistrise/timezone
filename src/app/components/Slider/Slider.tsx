import styles from './Slider.module.css'
import Image from "next/image";
import Dot from '../../../../public/icons/State=Off.svg'

const Slider = () => {
    return (
        <div className={styles.container}>
            <Image src={Dot} alt={''}></Image>
            <div className={styles.slider__background}></div>
        </div>
    )
}

export default Slider