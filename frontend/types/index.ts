export interface Song {
  id: string;
  title: string;
  duration: string;
  trackNumber: number;
}

export interface Album {
  id: string;
  /** First title line — displayed large in gold */
  titleLine1: string;
  /** Second title line — displayed slightly smaller in cream */
  titleLine2?: string;
  /** Eyebrow label above the title, e.g. "New Album" */
  label?: string;
  description: string;
  coverImage: string;
  backgroundImage: string;
  spotifyLink: string;
  appleMusicLink: string;
  youtubeLink: string;
  deezerLink: string;
  songs: Song[];
}
