import React from 'react';
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import AddCities from '../../../public/images/about/about_1.png';
import MoveRoller from '../../../public/images/about/about_2.png';
import MoveCard from '../../../public/images/about/about_3.png';
import DeleteCard from '../../../public/images/about/about_4.png';
import ChangeTimeFormat from '../../../public/images/about/about_5.png';
import {BasicText, HeadingH1, HeadingH2, HeadingH3, SmallText} from "@/ui/typography";

const Page = () => {
    return (
        <Container>
            <div style={{marginTop: '60px'}}>
                <HeadingH1 style={{color: '#000000', margin: 0, fontSize: '36px', textAlign: 'center'}}>About</HeadingH1>
            </div>
            <div style={{marginTop: '24px'}}>
                <BasicText style={{color: '#000000B8', margin: 0}}>
                    A Time Zone Converter is an intuitive and user-friendly tool designed to help users quickly and accurately convert time across different time zones worldwide. Whether you’re scheduling international meetings, coordinating with global teams, or planning travel, this tool makes it easy to compare local times in various cities and countries.
                </BasicText>
            </div>
            <div style={{marginTop: '36px'}}>
                <HeadingH2 style={{color: '#000000', margin: 0}}>How to use?</HeadingH2>
            </div>
            <div style={{marginTop: '24px'}}>
                <HeadingH2 style={{color: '#000000', margin: 0}}>Add the cities that you want to track</HeadingH2>
                <SmallText style={{color: '#000000B8', marginTop: "8px"}}>
                    Click on the “+” button under the list of cities, and enter the name of the city you need. Then just click on it, and it will automatically appear in the list of cities on the main page.
                </SmallText>
                <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '16px', display: 'inline-block', width: '100%', textAlign: 'center'}}>
        <Image src={AddCities} alt={'click plus'} height={280} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)', borderRadius: '16px'}} />
                </div>
            </div>
            <div style={{marginTop: '24px'}}>
                <HeadingH2 style={{color: '#000000', margin: 0}}>Use the Roller to shift the time</HeadingH2>
                <SmallText style={{color: '#000000B8', marginTop: "8px"}}>
                    To change the time, use the drum at the top of the list. You can spin it to any day and time, there are no restrictions. While scrolling the drum, you will see that the cards of the selected cities change color, time, and icons.
                    <br/>
                    <br/>
                    - The green color of the card and the sun icon indicate morning time.
                    <br/>
                    - The blue color and the moon icon indicate night.
                    <br/>
                    - Intermediate colors consist of green-blue, which indicates evening 
                    <br/>
                    - blue-green, which indicates early morning
                </SmallText>
                <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '16px', display: 'inline-block', width: '100%', textAlign: 'center'}}>
                    <Image src={MoveRoller} alt={'click plus'} height={280} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)', borderRadius: '16px'}} />
                </div>
            </div>
            <div style={{marginTop: '24px'}}>
                <HeadingH2 style={{color: '#000000', margin: 0}}>You can move the cities or delete them</HeadingH2>
                <SmallText style={{color: '#000000B8', marginTop: "8px"}}>
                    You can also rearrange the cities in the list for your convenience. To do this, simply click on the city card and, while holding it, move the cards to switch their places.
                </SmallText>
                <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '16px', display: 'inline-block', width: '100%', textAlign: 'center'}}>
                    <Image src={MoveCard} alt={'click plus'} height={280} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)', borderRadius: '16px'}} />
                </div>
                <SmallText style={{color: '#000000B8', marginTop: "8px"}}>
                <br/>
                    To delete a city, hover over the city card, and an "X" icon will appear on the right. Click on it, and the city will be removed from the list.
                <br/>
                </SmallText>
                <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '16px', display: 'inline-block', width: '100%', textAlign: 'center'}}>
                    <Image src={DeleteCard} alt={'click plus'} height={280} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)', borderRadius: '16px'}} />
                </div>
            </div>
            <div style={{marginTop: '24px'}}>
                <HeadingH2 style={{color: '#000000', margin: 0}}>You can change the time format</HeadingH2>
                <SmallText style={{color: '#000000B8', marginTop: "8px"}}>
                    You can use a 12-hour or 24-hour time format. To switch between formats, use the toggle switch located in the bottom right corner below the list of cities.
                </SmallText>
                <div style={{backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '16px', display: 'inline-block', width: '100%', textAlign: 'center'}}>
                    <Image src={ChangeTimeFormat} alt={'click plus'} height={280} style={{boxShadow: '0 0 4px rgba(0, 0, 0, 0.16)', borderRadius: '16px'}} />
                </div>
            </div>
        </Container>
    );
};

export default Page;