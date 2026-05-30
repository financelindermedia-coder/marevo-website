"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Plus } from "lucide-react";
import { Album, Song } from "@/types";
import { SongRow } from "./SongRow";
import { StreamingModal } from "./StreamingModal";

const WaveformDivider = () => (
  <svg width="130" height="22" viewBox="0 0 130 22" fill="none" aria-hidden>
    <path
      d="M0 11 L18 11 L22 3 L27 19 L32 6 L37 16 L42 11 L130 11"
      stroke="#FFAB40"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.55"
    />
  </svg>
);

export const AlbumSection = ({ album }: { album: Album }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [imgError, setImgError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax: section in view → background drifts upward at 25% speed */
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(parallaxProgress, [0, 1], ["0%", "25%"]);

  /* Crossfade: background fades in as section enters, fades out as it leaves */
  const { scrollYProgress: fadeProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(fadeProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  const handleSongPlay = (song: Song) => {
    setSelectedSong(song);
    setModalOpen(true);
  };

  const leftSongs = album.songs.slice(0, 6);
  const rightSongs = album.songs.slice(6, 12);

  return (
    <>
      <StreamingModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedSong(null); }}
        spotifyLink={album.spotifyLink}
        appleMusicLink={album.appleMusicLink}
        youtubeLink={album.youtubeLink}
        deezerLink={album.deezerLink}
        albumTitle={`${album.titleLine1}${album.titleLine2 ? ` ${album.titleLine2}` : ""}`}
        songTitle={selectedSong?.title}
      />

      {/*
       * The section is taller than 100vh so the user must scroll through it.
       * Card starts at ~22vh from section top, leaving the background image
       * visible above — matching the reference design.
       */}
      <section
        ref={sectionRef}
        id={`album-${album.id}`}
        className="relative min-h-[120vh] overflow-hidden"
      >
        {/* ── Parallax background ─────────────────────────── */}
        <motion.div
            style={{ y: bgY, opacity: bgOpacity, top: "-10%", bottom: "-10%", left: 0, right: 0 }}
          className="absolute z-0"
        >
          <Image
            src={album.backgroundImage}
            alt=""
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          {/* Gradient: transparent at top (show background), darker at card area */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/45 to-black/65" />
        </motion.div>

        {/* ── Glass card — sits at 22 vh from top of section ─ */}
        <div className="relative z-10 px-4 md:px-8 lg:px-12 pt-[22vh] pb-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
          >
            {/* ── TOP: Cover (5 cols) + Info (7 cols) ───────── */}
            <div className="grid grid-cols-12">

              {/* Album cover */}
              <div className="col-span-12 lg:col-span-5 flex items-center justify-center p-8 lg:p-10">
                <motion.div
                  className="relative w-56 h-56 md:w-72 md:h-72 rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    transform: "perspective(1000px) rotateY(-14deg) rotateX(3deg)",
                    filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.8))",
                  }}
                  whileHover={{
                    scale: 1.05,
                    filter: "drop-shadow(0 36px 56px rgba(0,0,0,0.85))",
                    transition: { duration: 0.4 },
                  }}
                >
                  {!imgError ? (
                    <Image
                      src={album.coverImage}
                      alt={album.titleLine1}
                      fill
                      className="object-cover"
                      onError={() => setImgError(true)}
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,#1A1110,#2C1B18,#3d2520)" }}
                    >
                      <span className="font-serif text-7xl text-marevo-gold/20">M</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>

              {/* Album info */}
              <div className="col-span-12 lg:col-span-7 flex flex-col justify-center px-6 lg:px-10 pb-8 lg:py-10">

                {/* "NEW ALBUM" eyebrow with flanking lines */}
                <motion.div
                  className="flex items-center gap-3 mb-5"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  <div className="h-px w-8 bg-marevo-gold/40" />
                  <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-marevo-gold/70">
                    {album.label ?? "Album"}
                  </span>
                  <div className="h-px max-w-30 flex-1 bg-marevo-gold/20" />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mb-3 leading-none"
                >
                  <div className="font-serif tracking-wide text-marevo-gold text-6xl md:text-7xl leading-none uppercase">
                    {album.titleLine1}
                  </div>
                  {album.titleLine2 && (
                    <div className="font-serif tracking-wide text-marevo-cream/85 text-5xl md:text-6xl leading-none uppercase">
                      {album.titleLine2}
                    </div>
                  )}
                </motion.div>

                {/* Waveform divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="origin-left mb-4"
                >
                  <WaveformDivider />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  className="text-marevo-cream/60 font-sans text-sm leading-relaxed mb-7 max-w-xs"
                >
                  {album.description}
                </motion.p>

                {/* Listen Now button */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  onClick={() => { setSelectedSong(null); setModalOpen(true); }}
                  className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full border border-marevo-gold/35 text-marevo-cream/80 font-sans text-[11px] tracking-[0.3em] uppercase hover:border-marevo-gold hover:bg-marevo-gold/10 hover:text-marevo-gold transition-all duration-300 w-fit"
                >
                  <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0">
                    <Play size={9} fill="currentColor" className="ml-0.5" />
                  </div>
                  Listen Now
                </motion.button>
              </div>
            </div>

            {/* ── BOTTOM: Full-width tracklist ───────────────── */}
            <div className="border-t border-marevo-gold/10 px-4 md:px-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-marevo-gold/10">

                {/* Tracks 01–06 */}
                <div className="pr-0 md:pr-6">
                  {leftSongs.map((song, i) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.35 }}
                      viewport={{ once: true }}
                    >
                      <SongRow song={song} onPlay={handleSongPlay} />
                    </motion.div>
                  ))}
                </div>

                {/* Tracks 07–12 */}
                <div className="pl-0 md:pl-6 mt-1 md:mt-0">
                  {rightSongs.map((song, i) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.35 }}
                      viewport={{ once: true }}
                    >
                      <SongRow song={song} onPlay={handleSongPlay} />
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </>
  );
};
