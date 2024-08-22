import styles from './BlogGrid.module.css'
import BlogGridItem from "@/app/blog/components/BlogGridItem/BlogGridItem";
import path from "path";
import fs from "fs";
import matter from "gray-matter";


const BlogsGrid = () => {
    const postsDirectory = path.join(process.cwd(), 'posts');

    function getSortedPostsData() {
        // Get file names under /posts
        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames.map((fileName) => {
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // Combine the data with the id
            return {
                id,
                ...matterResult.data,
                fileContents
            };
        });
        // Sort posts by date
        return allPostsData.sort((a, b) => {
            // @ts-ignore
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    const data = getSortedPostsData()
    return (
        <div className={styles.grid}>
            {data.map(e => <BlogGridItem key={e.id} e={e}/>)}
        </div>
    );
};

export default BlogsGrid;