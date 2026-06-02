import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AlbumSection } from "@/components/AlbumSection";
import { AboutSection } from "@/components/AboutSection";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Album } from "@/types";
import type { Album as PayloadAlbum, Media } from "@/payload-types";

export const dynamic = "force-dynamic";

function toAlbum(doc: PayloadAlbum): Album {
  const mediaUrl = (m: number | string | Media | null | undefined) =>
    typeof m === "object" && m && "url" in m && m.url ? m.url : "/images/placeholder-cover.svg";

  return {
    id: String(doc.id),
    titleLine1: doc.titleLine1,
    titleLine2: doc.titleLine2 ?? undefined,
    label: doc.label ?? undefined,
    description: doc.description,
    coverImage: mediaUrl(doc.coverImage),
    backgroundImage: mediaUrl(doc.backgroundImage),
    spotifyLink: doc.spotifyLink ?? "#",
    appleMusicLink: doc.appleMusicLink ?? "#",
    youtubeLink: doc.youtubeLink ?? "#",
    deezerLink: doc.deezerLink ?? "#",
    songs: (doc.songs ?? []).map((s, i) => ({
      id: String(i),
      title: s.title,
      duration: s.duration ?? "",
      trackNumber: s.trackNumber ?? i + 1,
    })),
  };
}

export default async function Home() {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "albums",
    sort: "order",
    limit: 20,
    depth: 1,
  });

  const albums: Album[] = docs.map(toAlbum);

  return (
    <main className="bg-marevo-umber">
      <Navbar />
      <Hero />
      {albums.map((album) => (
        <AlbumSection key={album.id} album={album} />
      ))}
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
