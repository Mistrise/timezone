import styles from './Slider.module.css'
import Image from "next/image";
import Dot from '../../../../public/icons/State=Off.svg'
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";

const Slider = () => {
    const timer = true
    return (
        <div className={styles.container}>
            {timer ? <SliderTimer/> : <Image src={Dot} alt={''}></Image>}
            <div className={styles.slider__background}></div>
        </div>
    )
}

export default Slider