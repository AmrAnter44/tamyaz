import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_Arabic } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { icons } from "lucide-react";
import { Geist } from 'next/font/google'
 import { Cairo } from 'next/font/google'
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
      
       <body className={cairo.className}>{children}</body>

    </html>
  );
}
