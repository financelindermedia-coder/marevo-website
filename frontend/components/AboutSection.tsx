"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(parallaxProgress, [0, 1], ["-8%", "8%"]);

  const { scrollYProgress: fadeProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(fadeProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6"
    >
      {/* ── Background image with glass/frost effect ────── */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/about-bg.jpeg"
          alt=""
          fill
          /* Strong frosted-glass effect on the image */
          className="object-cover object-center"
          style={{ filter: "blur(8px) saturate(0.6)" }}
          unoptimized
        />
        {/* Warm vignette overlay for depth */}
        {/* Umber overlay — matches the navigation tone */}
        <div className="absolute inset-0 bg-marevo-umber/85" />
      </motion.div>

      {/* ── Free-standing text — no card, no box ─────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-2xl text-center space-y-6"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-marevo-gold/50" />
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-marevo-gold/80">
            The Story
          </span>
          <div className="h-px w-8 bg-marevo-gold/50" />
        </div>

        {/* Headline */}
        <h2 className="font-serif text-marevo-cream text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg">
          Every song begins
          <br />
          with a feeling.
        </h2>

        {/* Gold divider */}
        <div className="w-16 h-px bg-marevo-gold/40 mx-auto" />

        {/* Body */}
        <div className="space-y-5 text-marevo-cream/70 font-sans text-sm md:text-base leading-relaxed drop-shadow-md max-w-xl mx-auto">
          <p>
            Kizomba isn&apos;t a dance for the gallery. It&apos;s the feeling
            when the beat grounds you, when you lose yourself in the rhythm
            and the world around you blurs. Marevo is exactly that: music
            that goes straight to your feet and pulls you onto the dance
            floor, no matter where you are.
          </p>
          <p>
            We don&apos;t make background music. Every track is made to be
            heard, felt, and danced to. It&apos;s the sound of real nights,
            of shared moments, and the energy that happens when people
            connect through the music. No frills, just pure Kizomba.
          </p>
        </div>
      </motion.div>

    </section>
  );
};
