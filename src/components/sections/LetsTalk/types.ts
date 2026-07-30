import { SOCIALS } from "./constants";

export type Social = (typeof SOCIALS)[number];

export type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
};
