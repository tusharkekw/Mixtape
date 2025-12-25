export type Playlist = {
  id: string;
  title: string;
  thumbnail: string;
  itemCount: number;
  platform: 'spotify' | 'google';
};

export type PlaylistItemType = {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
};
