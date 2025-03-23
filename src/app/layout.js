import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_Arabic } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { icons } from "lucide-react";






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Tamyaz',
  description: 'Create Your Website With One Step',
};
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['600', '900'], // اختياري
  display: 'swap',
})

export default function RootLayout({ children }) {


  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${notoArabic.className} bg`}
      >
        
        {children}
      </body>
    </html>
  );
}
