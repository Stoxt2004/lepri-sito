import type { Metadata } from 'next'
import { Poppins, Cormorant_Garamond, Cinzel } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lepri Hair Spa - Benessere e Stile per Te',
  description: 'Scopri benessere e stile con l\'esperienza Lepri Hair Spa. Taglio, colore, trattamenti spa capillare in un ambiente rilassante e professionale.',
  keywords: 'parrucchiere, hair spa, taglio capelli, colore capelli, trattamenti capillari, benessere, Milano',
  authors: [{ name: 'Lepri Hair Spa' }],
  creator: 'Lepri Hair Spa',
  publisher: 'Lepri Hair Spa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://leprihairspa.it'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lepri Hair Spa - Benessere e Stile per Te',
    description: 'Scopri benessere e stile con l\'esperienza Lepri Hair Spa. Taglio, colore, trattamenti spa capillare.',
    url: 'https://leprihairspa.it',
    siteName: 'Lepri Hair Spa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lepri Hair Spa',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lepri Hair Spa - Benessere e Stile per Te',
    description: 'Scopri benessere e stile con l\'esperienza Lepri Hair Spa.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cormorant.variable} ${cinzel.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}