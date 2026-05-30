"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotifyLink: string;
  appleMusicLink: string;
  youtubeLink: string;
  deezerLink: string;
  albumTitle: string;
  songTitle?: string; // when opening from a song row
}

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const DeezerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.944 17.245h2.999v1.687h-2.999zM.057 17.245h2.999v1.687H.057zm6.296 0h2.998v1.687H6.353zm6.296 0h2.998v1.687h-2.998zM.057 14.01h2.999v1.687H.057zm6.296 0h2.998v1.687H6.353zm6.296 0h2.998v1.687h-2.998zm6.296 0h2.999v1.687h-2.999zm-18.888-3.234h2.999v1.687H.057zm6.296 0h2.998v1.687H6.353zm6.296 0h2.998v1.687h-2.998zm6.296 0h2.999v1.687h-2.999zm-12.592-3.234h2.998v1.687H6.353zm6.296 0h2.998v1.687h-2.998zm6.296 0h2.999v1.687h-2.999zm-6.296-3.234h2.998v1.687h-2.998zm6.296 0h2.999v1.687h-2.999zm0-3.234h2.999v1.687h-2.999z" />
  </svg>
);

export const StreamingModal = ({
  isOpen,
  onClose,
  spotifyLink,
  appleMusicLink,
  youtubeLink,
  deezerLink,
  albumTitle,
  songTitle,
}: StreamingModalProps) => {
  const services = [
    {
      name: "Spotify",
      href: spotifyLink,
      icon: <SpotifyIcon />,
      hoverColor: "hover:text-green-400",
      label: "Stream on Spotify",
    },
    {
      name: "Apple Music",
      href: appleMusicLink,
      icon: <AppleIcon />,
      hoverColor: "hover:text-pink-400",
      label: "Listen on Apple Music",
    },
    {
      name: "Deezer",
      href: deezerLink,
      icon: <DeezerIcon />,
      hoverColor: "hover:text-marevo-gold",
      label: "Play on Deezer",
    },
    {
      name: "YouTube",
      href: youtubeLink,
      icon: <YouTubeIcon />,
      hoverColor: "hover:text-red-500",
      label: "Watch on YouTube",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="glass-card rounded-2xl p-8 max-w-sm w-full pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-marevo-gold/60 text-[10px] uppercase tracking-[0.4em] font-sans mb-1">
                    {songTitle ? "Play Track" : "Listen Now"}
                  </p>
                  <h3 className="font-serif text-marevo-cream text-xl leading-tight">
                    {songTitle ?? albumTitle}
                  </h3>
                  {songTitle && (
                    <p className="text-marevo-cream/40 text-xs font-sans mt-0.5">
                      {albumTitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-marevo-cream/30 hover:text-marevo-cream transition-colors mt-1 shrink-0 ml-4"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Platform list */}
              <div className="space-y-2.5">
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-200 text-marevo-cream/60 ${service.hoverColor} group`}
                  >
                    <span className="transition-colors duration-200 shrink-0">
                      {service.icon}
                    </span>
                    <span className="font-sans text-sm tracking-wide flex-1">
                      {service.label}
                    </span>
                    <span className="text-marevo-cream/20 group-hover:text-marevo-cream/50 text-sm transition-colors">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
