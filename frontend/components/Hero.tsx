"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* Fade out the video as the user scrolls away from the hero */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Video background — fades out while scrolling */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-black/55" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,171,64,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <span className="text-marevo-gold tracking-[0.35em] uppercase text-xs font-sans">
            Summer Music Collection
          </span>

          <div className="relative w-72 md:w-96 lg:w-120 h-20 md:h-28 lg:h-32">
            <Image
              src="/images/Marevo_white.png"
              alt="MAREVO"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="w-16 h-px bg-marevo-gold/40" />

          <p className="text-marevo-cream/65 text-base md:text-lg max-w-xl font-sans leading-relaxed">
            A soulful journey through rhythm, passion, and connection.
            <br />
            Experience the heartbeat of Kizomba.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-14 bg-linear-to-b from-marevo-gold/60 to-transparent origin-top"
        />
        <span className="text-marevo-gold/40 text-[10px] uppercase tracking-widest">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
};
