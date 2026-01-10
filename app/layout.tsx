
import Navbar from '../app/components/common/Navbar';
import { generateMetadata as getMetadata } from '../app/config/Meta';
import { ThemeProvider } from '../app/components/common/ThemeProviders';
import LenisWrapper from "@/app/components/common/LenisWrapper";
import { Space_Grotesk } from "next/font/google";
import { ViewTransitions } from 'next-view-transitions';
import "./globals.css";
import OnekoCat from "./components/common/OnekoCat";
import { Quote } from './components/common/Quote';
import Footer from './components/common/Footer';
import { ToasterClient } from './components/common/ToasterClient';
import ChatBubble from './components/common/ChatBubble';
import ViewCounter from './components/ViewCounter';
import LiquidLoader from './components/IntroLoader';

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

      <ViewTransitions>

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
           
 <LenisWrapper>
                   <LiquidLoader />
              <Navbar />
              {children}
               <OnekoCat />
                 <Quote />
                             <ViewCounter  />
                    
                    <Footer/>

                     <ChatBubble />
                     
                   <ToasterClient />
 </LenisWrapper>
          </ThemeProvider>
      </body>
    </html>
      </ViewTransitions>
  );
}
