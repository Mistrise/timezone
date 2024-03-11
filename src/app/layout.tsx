import 'normalize.css'
import './globals.css'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import Script from "next/script";  // Import the Head component from next/head

const publicSansFont = Public_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timezone Portal',
  description: 'Timezone Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={publicSansFont.className}>
        {children}
      </body>
      <Script
          async={true}
          src={'https://www.googletagmanager.com/gtag/js?id=G-0GHJHT40EY'}
      ></Script>
      <Script
          id='gtag-script'
          dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-0GHJHT40EY');
              `
          }}
      />
    </html>
  )
}
