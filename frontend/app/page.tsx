import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AlbumSection } from "@/components/AlbumSection";
import { AboutSection } from "@/components/AboutSection";
import { MOCK_ALBUMS } from "@/data/albums";

export default function Home() {
  return (
    <main className="bg-marevo-umber">
      {/* Fixed navigation bar — overlays every section */}
      <Navbar />

      {/* Section 1: Hero — full-screen video background */}
      <Hero />

      {/* Section 2+: Album sections — each with its own parallax background */}
      {MOCK_ALBUMS.map((album) => (
        <AlbumSection key={album.id} album={album} />
      ))}

      {/* About section — own background image + glass card */}
      <AboutSection />

      <footer
        id="contact"
        className="py-10 border-t border-white/5 bg-marevo-umber"
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-marevo-cream/20 text-xs font-sans tracking-widest uppercase">
            © 2026 Marevo — All rights reserved
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/impressum"
              className="text-marevo-cream/25 hover:text-marevo-gold text-xs font-sans tracking-widest uppercase transition-colors"
            >
              Impressum
            </Link>
            <span className="text-marevo-cream/15 text-xs">·</span>
            <Link
              href="/datenschutz"
              className="text-marevo-cream/25 hover:text-marevo-gold text-xs font-sans tracking-widest uppercase transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
