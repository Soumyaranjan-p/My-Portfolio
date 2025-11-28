import type { Metadata } from "next";

import Navbar from '../app/components/common/Navbar';
import { generateMetadata as getMetadata } from '../app/config/Meta';
import { ThemeProvider } from '../app/components/common/ThemeProviders';


import { Space_Grotesk } from "next/font/google";

import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose needed weights
});

// export const metadata = {
//   images: [
//       {
//         url: "/assets/logo.png", 
//         width: 1200,
//         height: 630,
//       },
//     ],
//   title: "My Portfolio",
//   description: "Web Developer Portfolio",

  
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
      {/* If your logo is square, this will now work */}
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
