import React from 'react';
import Script from "next/script";

const GoogleAnalyticsScript = () => {
    return (
        <>
            <Script
                src={'https://www.googletagmanager.com/gtag/js?id=G-0GHJHT40EY'}
                strategy="afterInteractive"
            ></Script>
            <Script id='gtag-script' strategy="afterInteractive">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-0GHJHT40EY');
          `}
            </Script>
        </>
    );
};

export default GoogleAnalyticsScript;