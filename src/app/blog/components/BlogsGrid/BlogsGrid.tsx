import styles from './BlogGrid.module.css'
import {getSortedPostsData} from "@/app/layout";
import DefaultImage from '../../../../../public/images/blog/BlogDefaultImage.png'
import Image from "next/image";
import {BasicText, SmallText} from "@/ui/typography";

interface Props {
    id: string
    fileContents: string
}

const BlogsGrid = () => {
    function removeBetween(str:string, startChar: string, endChar: string) {
        const startIndex = str.indexOf(startChar);
        const endIndex = str.indexOf(endChar, startIndex + 1);

        if (startIndex === -1 || endIndex === -1) {
            return str; // Если один из символов не найден, возвращаем строку без изменений
        }

        // Возвращаем строку с удаленными символами между startChar и endChar
        return str.slice(0, startIndex + 1) + str.slice(endIndex);
    }

    const data = getSortedPostsData()
    console.log(data)
    return (
        <div className={styles.grid}>
            {data.map(e => <div key={e.id} className={styles.grid__item}>
                <Image width={261} height={200} src={DefaultImage} alt={'default post image'}/>
                {/*@ts-ignore*/}
                <BasicText style={{padding: "12px", margin: 0}}>{e.title}</BasicText>
                {/*@ts-ignore*/}
                <SmallText style={{padding: "12px", margin: 0}}>{e.date}</SmallText>
            </div>)}
        </div>
    );
};

export default BlogsGrid;