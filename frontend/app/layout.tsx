import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Long Thinks',
  description: 'Your recent long thinks on Lichess and Chess.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
