import React from 'react';
import Link from "next/link";
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links_container}>
                {/* 
                    <Link href={'/privacy'} className={styles.links}>Privacy policy</Link>
                    <Link href={'/terms'} className={styles.links}>Terms of Service</Link>
                */}
                </div>
                <div className={styles.contacts_containers}>
                    <div>2025</div>
                    <a href="mailto:timehub24@gmail.com" className={styles.links}>Contact us</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;