import styles from './BlogGrid.module.css'
import {getSortedPostsData} from "@/app/layout";
import BlogGridItem from "@/app/blog/components/BlogGridItem/BlogGridItem";


const BlogsGrid = () => {
    const data = getSortedPostsData()
    return (
        <div className={styles.grid}>
            {data.map(e => <BlogGridItem key={e.id} e={e}/>)}
        </div>
    );
};

export default BlogsGrid;