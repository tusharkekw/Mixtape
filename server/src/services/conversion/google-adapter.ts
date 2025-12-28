import axios from "axios";
import { PlatformAdapter } from "../../type";
import { fetchYoutubePlaylistItems, PlaylistItem } from "../playlist/playlist-item.service";
import { getHeaders } from "../playlist/playlist-service";

const BASE_GOOGLE_URL = "https://www.googleapis.com/youtube/v3";

export const GoogleAdapter: PlatformAdapter = {
  getPlaylistTracks: function (accessToken: string, playlistId: string): Promise<PlaylistItem[]> {
    return fetchYoutubePlaylistItems(playlistId, accessToken);
  },
  searchTrack: function (accessToken: string, query: string): Promise<string | null> {
    return searchGoogleTrack(accessToken, query);
  },
  createPlaylist: function (
    accessToken: string,
    providerUserId: string,
    playlistName: string
  ): Promise<string> {
    return createYoutubePlaylist(accessToken, playlistName);
  },
  addTracksToPlaylist: function (accessToken: string, playlistId: string, itemId: string): Promise<void> {
    return addTrackToYoutubePlaylist(accessToken, playlistId, itemId);
  },
};

const addTrackToYoutubePlaylist = async (
  accessToken: string,
  playlistId: string,
  itemId: string
): Promise<void> => {
  const url = `${BASE_GOOGLE_URL}/playlistItems`;
  const response = await axios.post(
    url,
    {
      snippet: {
        playlistId,
        resourceId: {
          kind: "youtube#video",
          videoId: itemId,
        },
      },
    },
    {
      headers: getHeaders(accessToken),
      params: {
        part: "snippet,status",
      },
    }
  );

  const id = response.data;
  return;
};
const createYoutubePlaylist = async (accessToken: string, playlistName: string): Promise<string> => {
  const url: string = `${BASE_GOOGLE_URL}/playlists`;

  const response = await axios.post(
    url,
    {
      snippet: {
        title: playlistName,
        description: "Playlist created by Mixtape",
        defaultLanguage: "en",
      },
      status: {
        privacyStatus: "private",
      },
    },
    {
      headers: getHeaders(accessToken),
      params: {
        part: "snippet,status",
      },
    }
  );

  const playlistId = response.data?.id;

  return playlistId;
};

const searchGoogleTrack = async (accessToken: string, query: string): Promise<string | null> => {
  let url: string = `${BASE_GOOGLE_URL}/search?maxResults=1&q=${encodeURIComponent(query)}&type=video`;

  try {
    const response = await axios.get(url, {
      headers: getHeaders(accessToken),
    });

    const topHitTrackId = response.data?.items?.[0]?.id?.videoId;
    return topHitTrackId || null;
  } catch (error) {
    console.error(`Google Search failed for "${query}":`, error);
    return null;
  }
};
