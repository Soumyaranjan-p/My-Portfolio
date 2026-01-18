import Navbar from "../app/components/common/Navbar";
import { generateMetadata as getMetadata } from "../app/config/Meta";
import logo from "@/public/assets/logo.png";
import type { Metadata } from "next";
import { ThemeProvider } from "../app/components/common/ThemeProviders";
import LenisWrapper from "@/app/components/common/LenisWrapper";
import { Space_Grotesk } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import OnekoCat from "./components/common/OnekoCat";
import { Quote } from "./components/common/Quote";
import Footer from "./components/common/Footer";
import { ToasterClient } from "./components/common/ToasterClient";
import ChatBubble from "./components/common/ChatBubble";
import ViewCounter from "./components/ViewCounter";
// import LiquidLoader from './components/IntroLoader';
import Script from "next/script";
import IntroLoader from "./components/AnotherIntro";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// export const metadata = getMetadata();
export const metadata: Metadata = {
  metadataBase: new URL("https://www.soumyaa.site"),
  title: "Soumya Ranjan",
  description: " A Full-stack developer.",

  openGraph: {
    title: "Soumya Ranjan Portfolio",
    description: " A Full-stack developer.",
    url: "https://www.soumyaa.site",
    siteName: "Soumya Ranjan Portfolio",
    images: [
      {
        url: logo.src,
        width: 1200,
        height: 630,
        alt: "My Website Social Card",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumya Ranjan Portfolio",
    description: " A Full-stack developer.",
    images: [logo.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="c460e5b7-026e-4d0c-ae25-e0526093913b"
          ></Script>
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
              <IntroLoader />

              <Navbar />
              {children}
              <OnekoCat />
              <Quote />
              <ViewCounter />

              <Footer />

              <ChatBubble />

              <ToasterClient />
            </LenisWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
