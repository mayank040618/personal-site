import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Prabhat Singh Rajput — Theatre Educator, Speaker & Changemaker",
  description:
    "Prabhat Singh Rajput is a theatre educator, corporate trainer, and PhD scholar. Transforming communication through theatre, training, and community impact.",
  keywords: [
    "Prabhat Singh Rajput",
    "Theatre Education",
    "Corporate Training",
    "Keynote Speaker",
    "Communication Skills",
    "Leadership Development",
    "HOPE",
    "Stage4You",
  ],
  openGraph: {
    title: "Prabhat Singh Rajput — Theatre Educator, Speaker & Changemaker",
    description:
      "Transforming communication through theatre, training, and community impact.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-off-white text-charcoal font-body overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
