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
  title: 'Time Hub – Global Time Zone Converter for Every City',
  description: 'Time Hub Portal provides real-time time conversions across major global cities. Quickly find the current time anywhere in the world.',
  openGraph: {
    title: 'Time Hub – Real-Time Global Time Converter',
    description: 'Time Hub Portal allows you to check the current time in cities across the world instantly. Perfect for travelers, businesses, and remote teams.'
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
