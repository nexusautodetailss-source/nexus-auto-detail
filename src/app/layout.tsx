import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Auto Detail | Mobile Detailing by Chido & Adela — Lawrenceville, GA",
  description:
    "Award-winning mobile auto detailing service. We come to you — up to 40 miles from Lawrenceville, GA. Interior, Exterior, Full Detail, Ceramic Coating & more. Best of Gwinnett 9× winner.",
  keywords: "auto detail, mobile detailing, Lawrenceville GA, Gwinnett, ceramic coating, car wash, interior detail",
  openGraph: {
    title: "Nexus Auto Detail",
    description: "Mobile auto detailing by Chido & Adela. We come to you.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <LangProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
            <WhatsAppFloat />
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
