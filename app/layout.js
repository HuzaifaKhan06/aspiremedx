import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "AspireMedX | Smart Revenue Cycle Solutions",
  description:
    "AspireMedX delivers enterprise-grade medical billing, credentialing, revenue cycle management, denial management, and A/R management for healthcare organizations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
