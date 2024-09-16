import React from 'react';
import Container from "@/app/components/Container/Container";
import {BasicText, HeadingH1} from "@/ui/typography";
import BlogsGrid from "@/app/blog/components/BlogsGrid/BlogsGrid";

const Page = () => {
    return (
        <Container>
            <HeadingH1 style={{color: '#000000', margin: 0, fontSize: '36px', textAlign: 'center'}}>Blog</HeadingH1>
            <BasicText style={{ marginTop: '24px', color: '#000000B8'}}>Dealing with time zones and scheduling can be tricky, especially when working with teams across the globe. This blog is here to share helpful tips and tools for managing time differences, keeping your meetings on track, and staying organized.</BasicText>
            <BlogsGrid/>
        </Container>
    );
};

export default Page;