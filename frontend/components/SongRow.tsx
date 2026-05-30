"use client";

import { Play, Plus } from "lucide-react";
import { Song } from "@/types";

interface SongRowProps {
  song: Song;
  onPlay: (song: Song) => void;
}

export const SongRow = ({ song, onPlay }: SongRowProps) => (
  <div
    className="group flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
    onClick={() => onPlay(song)}
  >
    {/* Track number */}
    <span className="font-sans font-bold text-marevo-gold text-sm w-6 text-right shrink-0">
      {song.trackNumber.toString().padStart(2, "0")}
    </span>

    {/* Circle play button */}
    <div className="w-6 h-6 rounded-full border border-marevo-gold/35 flex items-center justify-center shrink-0 group-hover:border-marevo-gold group-hover:bg-marevo-gold/10 transition-all duration-200">
      <Play size={7} fill="currentColor" className="text-marevo-gold ml-px" />
    </div>

    {/* Title */}
    <span className="flex-1 text-marevo-cream text-sm font-sans group-hover:text-marevo-gold transition-colors truncate">
      {song.title}
    </span>

    {/* Duration */}
    <span className="text-marevo-cream/35 text-xs font-mono shrink-0">
      {song.duration}
    </span>

    {/* Plus — stops propagation so it doesn't trigger onPlay */}
    <Plus
      size={14}
      className="text-marevo-gold/35 hover:text-marevo-gold transition-colors shrink-0"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);
