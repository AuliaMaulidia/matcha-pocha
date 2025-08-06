import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matcha Pocha - Premium Matcha dari Indonesia',
  description: 'Matcha Pocha menyediakan matcha berkualitas tinggi dari kebun teh terbaik Indonesia dengan sentuhan tradisional Jepang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts link moved to body to avoid hydration mismatch */}
      </head>
      <body className={inter.className}>
        {children}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </body>
    </html>
  )
}
