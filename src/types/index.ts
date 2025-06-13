export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  category: string;
  scheduledTime?: string;
}

export interface ChannelConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  bgGradient: string[];
  icon: string;
  streamUrl?: string;
  isYoutube?: boolean;
  youtubeVideoId?: string;
  youtubePlaylist?: YouTubeVideo[];
}

export interface Program {
  time: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  isLive: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  Player: { channel: ChannelConfig };
  Playlist: { channel: ChannelConfig };
};

export type MainTabParamList = {
  Home: undefined;
  Schedule: undefined;
};

export interface ScheduleDay {
  day: string;
  date: string;
  programs: Program[];
}