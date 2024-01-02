import './globals.css'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import Head from 'next/head';  // Import the Head component from next/head

const publicSansFont = Public_Sans({ weight: ['400', '700'], subsets: ['latin'] })

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
    </html>
  )
}
