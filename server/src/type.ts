import { PlaylistItem } from "./services/playlist/playlist-item.service";

export interface PlatformAdapter {
  getPlaylistTracks(accessToken: string, playlistId: string): Promise<PlaylistItem[]>;
  searchTrack(accessToken: string, query: string): Promise<string | null>;
  createPlaylist(accessToken: string, providerUserId: string, playlistName: string): Promise<string>;
  addTracksToPlaylist(accessToken: string, playlistId: string, itemId: string): Promise<void>;
  addTracksToPlaylistBatch?(accessToken: string, playlistId: string, itemIds: string[]): Promise<void>;
}

export type Platform = "spotify" | "google"; // later: 'apple' | 'soundcloud'

export type SelectionState = {
  [playlistId: string]: SelectedPlaylistData;
};

export type SelectedPlaylistData = {
  playlistData: Playlist;
  isPlaylistSelected: boolean;
  selectedItems: PlaylistItem[];
};

export type TransferState = {
  sourcePlatform: string | null;
  destinationPlatform: string | null;
  selectedPlaylist: SelectionState;
  newPlaylistName: string | null;
};

export type Playlist = {
  id: string;
  title: string;
  thumbnail: string;
  itemCount: number;
  platform: Platform;
};

export type ConversionJobData = {
  source: string;
  destination: string;
  selectedPlaylist: SelectionState;
  transferMode: TransferMode;
  playlistName: string;
};

export enum TransferMode {
  UNIFIED = "unified",
  INDIVIDUAL = "individual",
}
