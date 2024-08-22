import Container from "@/app/components/Container/Container";
import Link from "next/link";
import {BasicText, HeadingH1} from "@/ui/typography";
import DefaultImage from "../../../../public/images/blog/BlogDefaultImage.png";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const Page = ({ params }: { params: { slug: string } }) => {
    const postsDirectory = path.join(process.cwd(), 'posts');
    function getPostByIdData(postId: string) {
        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames.map((fileName) => {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);
            return {
                id,
                ...matterResult.data,
                fileContents
            };
        });
        return allPostsData.find(post => {
            return post.id === postId
        });
    }

    {/*@ts-ignore*/}
    const {title, fileContents} = getPostByIdData(params.slug)

    function removeBetween(str:string, startChar: string, endChar: string) {
        const startIndex = str.indexOf(startChar);
        const endIndex = str.indexOf(endChar, startIndex + 1);

        if (startIndex === -1 || endIndex === -1) {
            return str;
        }
        return str.slice(0, startIndex + 1) + str.slice(endIndex);
    }
    const content = removeBetween(fileContents, '---', '---')
    return (
            <Container>
                <Link href={'/blog'} style={{marginTop: "52px", marginLeft: '10px'}}>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.0234375 6.34375C0.0234375 6.0625 0.127604 5.82292 0.335938 5.625L5.44531 0.515625C5.55469 0.40625 5.66667 0.328125 5.78125 0.28125C5.90104 0.229167 6.02083 0.203125 6.14062 0.203125C6.42708 0.203125 6.65885 0.291667 6.83594 0.46875C7.01302 0.645833 7.10156 0.864583 7.10156 1.125C7.10156 1.26562 7.07292 1.39583 7.01562 1.51562C6.96354 1.63021 6.89323 1.73177 6.80469 1.82031L5.05469 3.58594L2.28125 6.13281L1.92188 5.53125L4.76562 5.375H13.9844C14.2812 5.375 14.5208 5.46615 14.7031 5.64844C14.8854 5.82552 14.9766 6.05729 14.9766 6.34375C14.9766 6.63542 14.8854 6.8724 14.7031 7.05469C14.5208 7.23177 14.2812 7.32031 13.9844 7.32031H4.76562L1.92188 7.15625L2.28125 6.57031L5.05469 9.10156L6.80469 10.8672C6.89323 10.9557 6.96354 11.0573 7.01562 11.1719C7.07292 11.2865 7.10156 11.4167 7.10156 11.5625C7.10156 11.8229 7.01302 12.0417 6.83594 12.2188C6.65885 12.3958 6.42708 12.4844 6.14062 12.4844C5.89062 12.4844 5.66406 12.3828 5.46094 12.1797L0.335938 7.0625C0.127604 6.86458 0.0234375 6.625 0.0234375 6.34375Z"
                            fill="black" fillOpacity="0.64"/>
                    </svg>
                </Link>

                <div>
                    {title === undefined ?
                        null
                        : <div>
                            <HeadingH1>
                                {title}
                            </HeadingH1>
                            <Image width={588} height={322} src={DefaultImage} alt={'default post image'} style={{borderRadius: "16px"}}/>
                            <BasicText>
                                {content}
                            </BasicText>
                        </div>
                    }
                </div>
            </Container>
    );
};

export default Page;