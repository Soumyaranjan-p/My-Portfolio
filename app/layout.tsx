import type { Metadata } from "next";

import Navbar from '../app/components/common/Navbar';

import { ThemeProvider } from '../app/components/common/ThemeProviders';


import { Space_Grotesk } from "next/font/google";

import "./globals.css";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose needed weights
});

export const metadata = {
  title: "My Portfolio",
  description: "Web Developer Portfolio",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
