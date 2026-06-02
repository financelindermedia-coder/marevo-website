import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — MAREVO",
};

export default function Datenschutz() {
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
            Datenschutzerklärung
          </h1>
          <div className="w-12 h-px bg-marevo-gold/30 mt-4" />
        </div>

        <section className="space-y-3 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">1. Datenschutz auf einen Blick</h2>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section className="space-y-3 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">2. Datenerfassung auf dieser Website</h2>
          <h3 className="text-marevo-cream/90 font-sans font-medium">Wer ist verantwortlich für die Datenerfassung?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
            Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
          <h3 className="text-marevo-cream/90 font-sans font-medium mt-4">Wie erfassen wir Ihre Daten?</h3>
          <p>
            Diese Website erhebt keine personenbezogenen Daten aktiv. Es werden keine
            Tracking-Tools, Cookies oder Analytics-Dienste eingesetzt.
          </p>
        </section>

        <section className="space-y-3 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">3. Hosting</h2>
          <p>
            Diese Website wird auf einem Server in Deutschland gehostet. Der Hoster erhebt
            automatisch Informationen in sogenannten Server-Log-Files, die Ihr Browser beim
            Besuch der Seite automatisch übermittelt. Dies sind: Browsertyp und Browserversion,
            verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners,
            Uhrzeit der Serveranfrage sowie IP-Adresse.
          </p>
          <p>
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung
            dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section className="space-y-3 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">4. Externe Links</h2>
          <p>
            Diese Website enthält Links zu externen Streaming-Plattformen (Spotify, Apple Music,
            YouTube, Deezer). Wenn Sie diese Links nutzen, verlassen Sie unsere Website.
            Für die Datenschutzpraktiken dieser Drittanbieter sind wir nicht verantwortlich.
            Bitte lesen Sie die Datenschutzerklärungen der jeweiligen Dienste.
          </p>
        </section>

        <section className="space-y-3 font-sans text-sm text-marevo-cream/70 leading-relaxed">
          <h2 className="font-serif text-marevo-gold text-xl mb-3">5. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
            und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
            außerdem ein Recht auf Berichtigung oder Löschung dieser Daten. Wenn Sie eine
            Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit
            für die Zukunft widerrufen.
          </p>
          <p>
            Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
            <a href="mailto:info@marevo.com" className="text-marevo-gold/80 hover:text-marevo-gold transition-colors ml-1">
              info@marevo.com
            </a>
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
