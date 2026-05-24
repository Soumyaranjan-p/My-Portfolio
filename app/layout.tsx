import Navbar from "../app/components/common/Navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "../app/components/common/ThemeProviders";
import LenisWrapper from "@/app/components/common/LenisWrapper";
import { Space_Grotesk } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/common/Footer";
import { ToasterClient } from "./components/common/ToasterClient";
import { Quote } from "@/app/components/common/Quote";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soumyaa.site"),
  title: "Soumya Ranjan Portfolio",
  description:
    "Full Stack developer passionate about building web applications. Experienced in React, Next.js, Node.js, and modern web technologies.",
  openGraph: {
    title: "Soumya Ranjan Portfolio",
    description:
      "Full Stack developer passionate about building web applications.",
    url: "https://soumyaa.site",
    siteName: "Soumya Portfolio",
    images: [
      {
        url: "/assets/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Soumya Ranjan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumya Ranjan Portfolio",
    description:
      "Full Stack developer passionate about building web applications.",
    images: ["/assets/opengraph2.png"],
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
          <link rel="icon" href="/assets/logo.png" type="image/png" />

        </head>

        <body className={spaceGrotesk.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LenisWrapper>
              <Navbar />
              <main className="min-h-screen pt-16 pb-12">
                {children}
              </main>
              <Quote />
              <Footer />
              <ToasterClient />
            </LenisWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}