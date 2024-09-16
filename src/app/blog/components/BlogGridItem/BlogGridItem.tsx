'use client'
import styles from "./BlogGridItem.module.css";
import Image from "next/image";
import {useRouter} from "next/navigation";


const BlogGridItem = (article: any) => {
    const router = useRouter()
    
    // Ensure we only render valid articles
    if (!article?.e?.id || !article?.e?.title || !article?.e?.date) {
        return null;  // Prevent rendering an empty card
    }
    
    return (
        <div key={article?.e?.id} className={styles.grid__item} onClick={() => router.push(`blog/${article?.e?.id}`)}>
            <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                <Image
                    src={article?.e?.id ? `/images/blog/${article.e.id}.png` : '/images/default.png'}
                    alt={'default post image'}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles.grid__item__title}>
                <div style={{ padding: "12px", margin: 0 }}>
                    {article?.e?.title && article.e.title.length > 65 
                        ? `${article.e.title.slice(0, 65)}...` 
                        : article?.e?.title}
                </div>
            </div>
            <div className={styles.grid__item__time}>
                <div>{article?.e?.date}</div>
            </div>
        </div>
    );
};

export default BlogGridItem;