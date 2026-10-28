import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Nastaliq_Urdu, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, Header, Footer, SearchModal } from "@/components";
import { OrganizationSchema, WebsiteSchema } from "@/components/schemas";
import { getAllCategories, getAllPosts, getAllPoets } from "@/lib/content";
import { ADS_CONFIG } from "@/config/ads";
import { SearchDataInjector } from "./SearchDataInjector";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://poetryinurdutext.com'),
  title: {
    default: "Poetry in Urdu Text - Best Urdu Poetry Collection",
    template: "%s | Poetry in Urdu Text",
  },
  description: "Discover the beauty of Urdu poetry. Explore classical and contemporary poems, ghazals, and couplets from legendary poets like Allama Iqbal, Mirza Ghalib, and Faiz Ahmed Faiz.",
  keywords: ["urdu poetry", "urdu shayari", "sad poetry", "love poetry", "ghazal", "allama iqbal", "mirza ghalib", "urdu quotes"],
  authors: [{ name: "Poetry in Urdu Text" }],
  creator: "Poetry in Urdu Text",
  publisher: "Poetry in Urdu Text",
  openGraph: {
    type: "website",
    locale: "ur_PK",
    alternateLocale: "en_US",
    url: "https://poetryinurdutext.com",
    siteName: "Poetry in Urdu Text",
    title: "Poetry in Urdu Text - Best Urdu Poetry Collection",
    description: "Discover the beauty of Urdu poetry with our collection of classical and contemporary poems.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Poetry in Urdu Text",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poetry in Urdu Text",
    description: "Discover the beauty of Urdu poetry",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getAllCategories();
  const posts = getAllPosts();
  const poets = getAllPoets();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
        {/* JSON-LD Schemas for SEO */}
        <OrganizationSchema />
        <WebsiteSchema />
        {/* Google AdSense */}
        {ADS_CONFIG.client && ADS_CONFIG.client !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
          <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.client}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} ${notoNastaliq.variable}`}>
        <ThemeProvider>
          <SearchDataInjector posts={posts} poets={poets} />
          <Header categories={categories} />
          <main style={{ minHeight: 'calc(100vh - 300px)' }}>
            {children}
          </main>
          <Footer categories={categories} />
          <SearchModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
