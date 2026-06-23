import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Cursor } from "@/components/ui/Cursor";
import { EdgeLabels } from "@/components/ui/EdgeLabels";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL = "https://pdrbala.github.io/pedro-portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pedro Guilherme — Graphic Designer & Motion-led Visual Systems",
    template: "%s — Pedro Guilherme",
  },
  description:
    "Brazil-based graphic designer crafting editorial systems, brand identities and motion-led visual work.",
  openGraph: {
    type: "website",
    siteName: "Pedro Guilherme",
    title: "Pedro Guilherme — Graphic Designer & Art Director",
    description:
      "Editorial systems, brand identities and motion-led visual work. Brazil-based, working worldwide.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: "Pedro Guilherme" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Guilherme — Graphic Designer & Art Director",
    description: "Editorial, brand and motion-led visual work.",
    images: [`${SITE_URL}/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-300 focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <SmoothScrollProvider>
            <GridOverlay />
            <EdgeLabels />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScrollProvider>
          <NoiseOverlay />
          <Cursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
