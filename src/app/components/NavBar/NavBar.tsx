'use client'
import styles from './NavBar.module.css'
import Container from "@/app/components/Container/Container";
import Link from "next/link";
import {usePathname} from "next/navigation";
import timeHubIcon from '../../apple-icon.png'
import Image from "next/image";

const NavBar = () => {
    const pathname = usePathname()
    return (
        <Container>
            <div className={styles.navBarContainer}>
                <Link href={'/'} className={styles.navLink}>
                    <div className={`${styles.navBarItem} ${pathname === '/' ? `${styles.active}` : ''}`}>
                        <Image src={timeHubIcon} alt='logo' width={24} height={24}/>
                        <p style={{marginLeft: '8px'}}>TimeHub</p>
                    </div>
                </Link>
                <div className={styles.navBarContainerSecondaryItems}>
                    <Link href={'/about'} className={styles.navLink}>
                        <div className={`${styles.navBarItem} ${pathname === '/about' ? `${styles.active}` : ''}`}>
                            About
                        </div>
                    </Link>
                    <Link href={'/blog'} className={styles.navLink}>
                        <div className={`${styles.navBarItem} ${pathname.startsWith('/blog') ? `${styles.active}` : ''}`}>
                            Blog
                        </div>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default NavBar;