import React from "react"
import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const _bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const _jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://irondistrict.com'),
  title: 'IRON DISTRICT // CrossFit',
  description: 'Crudo. Implacable. Resultados. Sin atajos. Sin excusas. Solo hierro.',
  openGraph: {
    title: 'IRON DISTRICT // CrossFit',
    description: 'Landing page CrossFit de estilo brutalista. Tipografía pesada, animaciones agresivas, texturas industriales. Construido con Next.js y Tailwind.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IRON DISTRICT - Rompe Cada Límite',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IRON DISTRICT // CrossFit',
    description: 'Landing page CrossFit brutalista. Construido solo con prompts en v0.',
    images: ['/images/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${_bebasNeue.variable} ${_jetbrainsMono.variable}`}>
      <body className="font-mono antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
