import './globals.css'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import GoogleAnalyticsScript from "@/app/GoogleAnalyticsScript";
import NavBar from "@/app/components/NavBar/NavBar";

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
