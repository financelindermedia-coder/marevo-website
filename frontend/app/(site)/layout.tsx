import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAREVO | Kizomba Summer Music",
  description:
    "Experience the soulful rhythm of Kizomba summer music. MAREVO — where every song begins with a feeling.",
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${montserrat.variable} ${cormorant.variable} antialiased font-sans`}>
      {children}
    </div>
  );
}
