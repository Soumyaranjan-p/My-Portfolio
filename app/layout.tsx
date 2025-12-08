import type { Metadata } from "next";

import Navbar from '../app/components/common/Navbar';
import { generateMetadata as getMetadata } from '../app/config/Meta';
import { ThemeProvider } from '../app/components/common/ThemeProviders';


import { Space_Grotesk } from "next/font/google";

import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});



  
export const metadata = getMetadata('/');


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
      <link rel="icon" href="/assets/logo.png" type="image/png" />
    
    </head>
      <body className={spaceGrotesk.className} suppressHydrationWarning>



        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
              <Navbar />
              {children}
              
          </ThemeProvider>
      </body>
    </html>
  );
}
