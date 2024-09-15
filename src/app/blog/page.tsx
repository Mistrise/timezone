import React from 'react';
import Container from "@/app/components/Container/Container";
import {BasicText, HeadingH1} from "@/ui/typography";
import BlogsGrid from "@/app/blog/components/BlogsGrid/BlogsGrid";

const Page = () => {
    return (
        <Container>
            <HeadingH1 style={{color: '#000000', margin: 0, fontSize: '36px', textAlign: 'center'}}>Blog</HeadingH1>
            <BasicText style={{ marginTop: '24px', color: '#000000B8'}}>A Time Zone Converter is an intuitive and user-friendly tool designed to help users quickly and accurately convert time across different time zones worldwide. Whether you’re scheduling international meetings, coordinating with global teams, or planning travel, this tool makes it easy to compare local times in various cities and countries.</BasicText>
            <BlogsGrid/>
        </Container>
    );
};

export default Page;