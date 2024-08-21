import './globals.css'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import GoogleAnalyticsScript from "@/app/GoogleAnalyticsScript";
import NavBar from "@/app/components/NavBar/NavBar";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const publicSansFont = Public_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.timehub.work/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: 'Timezone Portal',
  description: 'Service that shows time in different cities',
  openGraph: {
    title: 'Timezone Portal',
    description: 'Service that shows time in different cities'
  }
}


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
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

export function getPostByIdData(postId: string) {
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <GoogleAnalyticsScript/>
      <body className={publicSansFont.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
