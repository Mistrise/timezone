'use client'
import styles from "./BlogGridItem.module.css";
import Image from "next/image";
import DefaultImage from "../../../../../public/images/blog/BlogDefaultImage.png";
import {useRouter} from "next/navigation";


const BlogGridItem = (article: any) => {
    const router = useRouter()
    return (
        <div key={article.e.id} className={styles.grid__item} onClick={() => router.push(`blog/${article.e.id}`)}>
            <Image width={261} height={200} src={DefaultImage} alt={'default post image'}/>
            <div className={styles.grid__item__title}>
                {/*@ts-ignore*/}
                <div style={{padding: "12px", margin: 0}}>{article.e.title.length > 65 ?
                    // @ts-ignore
                    `${article.e.title.slice(0, 65)}...` :
                    // @ts-ignore
                    article.e.title
                }</div>
            </div>
            <div className={styles.grid__item__time}>
                {/*@ts-ignore*/}
                <div>{article.e.date}</div>
            </div>
        </div>
    );
};

export default BlogGridItem;