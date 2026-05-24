import Navbar from "@/app/components/common/Navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "../app/components/common/ThemeProviders";
import LenisWrapper from "@/app/components/common/LenisWrapper";
import { DM_Sans, DM_Serif_Display, DM_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Footer from "./components/common/Footer";
import { ToasterClient } from "./components/common/ToasterClient";
import { Quote } from "@/app/components/common/Quote";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata = {
  metadataBase: new URL("https://soumyaa.site"),

  title: "Soumya Ranjan Portfolio",
  description: "A Full-stack developer.",

  openGraph: {
    title: "Soumya Ranjan Portfolio",
    description: "A Full-stack developer.",
    url: "https://soumyaa.site",
    siteName: "Soumya Portfolio",
    images: [
      {
        url: "/assets/opengraph2.png",
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
    description: "A Full-stack developer.",
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
      <html
        lang="en"
        suppressHydrationWarning
        className={`${dmSans.variable} ${dmSerif.variable} ${dmMono.variable}`}
      >
        <head>
          <link rel="icon" href="/assets/logo.png" type="image/png" />
        </head>
        <body className="font-sans" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LenisWrapper>
              <Navbar />
              <main className="min-h-screen pt-16 pb-12">{children}</main>
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