import axios from "axios";
import { PlatformAdapter } from "../../type";
import { fetchYoutubePlaylistItems, PlaylistItem } from "../playlist/playlist-item.service";
import { getHeaders } from "../playlist/playlist-service";

export const GoogleAdapter: PlatformAdapter = {
  getPlaylistTracks: function (accessToken: string, playlistId: string): Promise<PlaylistItem[]> {
    return fetchYoutubePlaylistItems(playlistId, accessToken);
  },
  searchTrack: function (accessToken: string, query: string): Promise<string> {
    throw new Error("Function not implemented.");
  },
  createPlaylist: function (
    accessToken: string,
    providerUserId: string,
    playlistName: string
  ): Promise<string> {
    throw new Error("Function not implemented.");
  },
  addTracksToPlaylist: function (accessToken: string, playlistId: string, itemId: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
};
