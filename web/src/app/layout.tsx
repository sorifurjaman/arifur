import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ImagePreloader from '@/components/ImagePreloader';
import NavigationTrap from '@/components/NavigationTrap';
import { AudioProvider } from '@/context/AudioContext';
import { artistProfile } from '@/data/artworks';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arifurhackworld.com';

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ARIFUR | Contemporary Visual Artist, Bot Developer & Creator',
    template: '%s | ARIFUR',
  },
  description:
    'Official portfolio and contemporary art gallery of Arifur Jaman (Arifur Hackworld). Explore 68+ curated visual artworks, autonomous Telegram bot ecosystems, and immersive audio guides.',
  keywords: [
    'Arifur',
    'Arifur Jaman',
    'Arifur Hackworld',
    'arifur905',
    'contemporary art gallery',
    'digital artist bangladesh',
    'telegram bot developer',
    'autonomous bot developer',
    'creative technologist',
    'fine art portfolio',
    'computational aesthetics',
    'kexart',
    'arifur live tv',
    'fast video downloader',
    'web projects',
    'contemporary studio',
    'visual arts',
    'audio guide gallery',
  ],
  authors: [{ name: 'Arifur Jaman', url: 'https://github.com/biplobc384-dotcom/biplobc384-dotcom' }],
  creator: 'Arifur Jaman',
  publisher: 'Arifur Hackworld',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'ARIFUR | Contemporary Visual Artist, Bot Developer & Creator',
    description:
      'Official portfolio and contemporary art gallery of Arifur Jaman. Explore 68+ curated visual artworks, autonomous Telegram bot ecosystems, and immersive audio guides.',
    url: siteUrl,
    siteName: 'ARIFUR — Contemporary Creative Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/owner.jpg',
        width: 1200,
        height: 630,
        alt: 'Arifur Jaman — Founder & Creative Technologist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARIFUR | Contemporary Visual Artist, Bot Developer & Creator',
    description:
      'Official portfolio and contemporary art gallery of Arifur Jaman. Explore 68+ curated visual artworks, autonomous Telegram bots, and cutting-edge software.',
    creator: '@arifur905',
    images: ['/images/owner.jpg'],
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
  category: 'Art, Technology & Software Engineering',
  icons: {
    icon: '/favicon.ico',
    apple: '/images/owner.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Arifur Jaman',
        alternateName: ['Arifur', 'arifur905'],
        jobTitle: 'Founder, Creative Technologist & Visual Artist',
        worksFor: {
          '@type': 'Organization',
          name: 'Arifur Hackworld',
          url: 'https://t.me/ArifurHackworld',
        },
        image: `${siteUrl}/images/owner.jpg`,
        description: artistProfile.bio,
        sameAs: [
          artistProfile.socialLinks.telegramGroup,
          artistProfile.socialLinks.telegramChannel,
          artistProfile.socialLinks.facebook,
          artistProfile.socialLinks.github,
          artistProfile.socialLinks.discord,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'ARIFUR',
        description: 'Official portfolio and gallery of Arifur Jaman.',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ArtGallery',
        '@id': `${siteUrl}/#gallery`,
        name: 'ARIFUR Contemporary Art Gallery',
        url: siteUrl,
        description: 'Explore 68+ curated visual artworks with high-velocity cycle stream and signature audio guide.',
        image: `${siteUrl}/images/owner.jpg`,
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#fafafa] text-[#171717] min-h-screen flex flex-col selection:bg-black selection:text-white" suppressHydrationWarning>
        <AudioProvider>
          <ImagePreloader />
          <NavigationTrap />
          <Navbar />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
