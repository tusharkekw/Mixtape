export type Playlist = {
  id: string;
  title: string;
  thumbnail: string;
  platform: 'spotify' | 'google';
};

export type PlaylistItemType = {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
};
