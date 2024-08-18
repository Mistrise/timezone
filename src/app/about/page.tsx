import React from 'react';
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import AddCities from '../../../public/images/about/addCitiesImage.png'
import MoveRoller from '../../../public/images/about/moveRollerImage.png'
import MoveCard from '../../../public/images/about/moveCardsImage.png'
import DeleteCard from '../../../public/images/about/deleteCardImage.png'
import ChangeTimeFormat from '../../../public/images/about/changeTimeFormatImgae.png'
import {BasicText, HeadingH1, HeadingH2, HeadingH3, SmallText} from "@/ui/typography";

const Page = () => {
    return (
        <Container>
                <div style={{marginTop: '40px'}}>
                        <HeadingH1 style={{color: '#000000A3', margin: 0}}>About</HeadingH1>
                </div>
                <div style={{marginTop: '24px'}}>
                        <BasicText style={{color: '#000000A3', margin: 0}}>A Time Zone Converter is an intuitive and user-friendly tool designed to help users quickly and accurately convert time across different time zones worldwide. Whether you’re scheduling international meetings, coordinating with global teams, or planning travel, this tool makes it easy to compare local times in various cities and countries.</BasicText>
                </div>
                <div style={{marginTop: '36px'}}>
                        <HeadingH2 style={{color: '#000000A3', margin: 0}}>How to use?</HeadingH2>
                </div>
                <div style={{marginTop: '24px'}}>
                        <HeadingH3 style={{color: '#000000A3', margin: 0}}>1. Add the cities that you want to track</HeadingH3>
                        <SmallText style={{color: '#000000A3', marginTop: "8px"}}>Click on the “+” button under the list of cities, and enter the name of the city you need. Then just click on it, and it will automatically appear in the list of cities on the main page.</SmallText>
                        <Image src={AddCities} alt={'click plus'} width={588} height={254}/>
                </div>
                <div style={{marginTop: '24px'}}>
                        <HeadingH3 style={{color: '#000000A3', margin: 0}}>2. Use the Roller to shift the time</HeadingH3>
                        <SmallText style={{color: '#000000A3', marginTop: "8px"}}>To change the time, use the drum at the top of the list. You can spin it to any day and time, there are no restrictions. While scrolling the drum, you will see that the cards of the selected cities change color, time, and icons.<br/>- The green color of the card and the sun icon indicate morning time.<br/> - The blue color and the moon icon indicate night.<br/> - Intermediate colors consist of green-blue, which indicates evening <br/> - blue-green, which indicates early morning</SmallText>
                        <Image src={MoveRoller} alt={'move roller'} width={588} height={254}/>
                </div>
                <div style={{marginTop: '24px'}}>
                        <HeadingH3 style={{color: '#000000A3', margin: 0}}>3. You can move the cities or delete them</HeadingH3>
                        <SmallText style={{color: '#000000A3', marginTop: "8px"}}>You can also rearrange the cities in the list for your convenience. To do this, simply click on the city card and, while holding it, move the cards to switch their places.</SmallText>
                        <Image src={MoveCard} alt={'move card'} width={588} height={254}/>
                        <SmallText style={{color: '#000000A3', marginTop: "8px"}}>To delete a city, hover over the city card, and an `&quot;`X`&quot;` icon will appear on the right. Click on it, and the city will be removed from the list.</SmallText>
                        <Image src={DeleteCard} alt={'delete card'} width={588} height={254}/>
                </div>
                <div style={{marginTop: '24px'}}>
                        <HeadingH3 style={{color: '#000000A3', margin: 0}}>4. You can change the time format</HeadingH3>
                        <SmallText style={{color: '#000000A3', marginTop: "8px"}}>You can use a 12-hour or 24-hour time format. To switch between formats, use the toggle switch located in the bottom right corner below the list of cities.</SmallText>
                        <Image src={ChangeTimeFormat} alt={'change time format'} width={588} height={254}/>
                </div>
        </Container>
    );
};

export default Page;