import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — MAREVO",
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-marevo-umber text-marevo-cream">
      {/* Top bar */}
      <div className="border-b border-marevo-gold/10">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-marevo-gold text-xl tracking-widest hover:text-marevo-cream transition-colors"
          >
            MAREVO
          </Link>
          <Link
            href="/"
            className="font-sans text-xs tracking-[0.2em] uppercase text-marevo-cream/40 hover:text-marevo-gold transition-colors"
          >
            ← Zurück
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <div>
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-marevo-gold/60 mb-3">
            Rechtliches
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-marevo-cream">
            Impressum
          </h1>
          <div className="w-12 h-px bg-marevo-gold/30 mt-4" />
        </div>

        <section className="space-y-2 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">Angaben gemäß § 5 TMG</h2>
          <p>Marevo Music</p>
          <p>Musterstraße 1</p>
          <p>12345 Musterstadt</p>
          <p>Deutschland</p>
        </section>

        <section className="space-y-2 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">Kontakt</h2>
          <p>E-Mail: <a href="mailto:info@marevo.com" className="text-marevo-gold/80 hover:text-marevo-gold transition-colors">info@marevo.com</a></p>
          <p>Telefon: +49 (0) 000 000 0000</p>
        </section>

        <section className="space-y-2 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">Verantwortlich für den Inhalt</h2>
          <p>Marevo Music</p>
          <p>Musterstraße 1, 12345 Musterstadt</p>
        </section>

        <section className="space-y-2 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">Haftungsausschluss</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
            Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich
            deren Betreiber verantwortlich.
          </p>
        </section>

        <section className="space-y-2 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-marevo-cream/20 text-xs font-sans tracking-widest uppercase">
          © 2026 Marevo — All rights reserved
        </p>
      </footer>
    </main>
  );
}
