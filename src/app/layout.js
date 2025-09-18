import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Cairo } from 'next/font/google'
import { LanguageProvider } from '../contexts/LanguageContext';
import FloatingWhatsAppCTA from '../component/Cta';
const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Tamyaz',
  description: 'Create Your Website With One Step',
};

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['500', '800'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={geist.className}>
      <body className={cairo.className}>
        <LanguageProvider>
          {children}
                    <FloatingWhatsAppCTA />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}