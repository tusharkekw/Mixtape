import axios from "axios";
import { PlatformAdapter } from "../../type";
import { fetchSpotifyPlaylistItems } from "../playlist/playlist-item.service";
import { getHeaders } from "../playlist/playlist-service";

const BASE_SPOTIFY_URL = "https://api.spotify.com/v1";

export const SpotifyAdapter: PlatformAdapter = {
  getPlaylistTracks: function (accessToken: string, playlistId: string): Promise<any> {
    return fetchSpotifyPlaylistItems(playlistId, accessToken);
  },
  searchTrack: function (accessToken: string, query: string): Promise<string | null> {
    return searchTrackSpotify(accessToken, query);
  },
  createPlaylist: function (
    accessToken: string,
    providerUserId: string,
    playlistName: string
  ): Promise<string> {
    return createSpotifyPlaylist(accessToken, providerUserId, playlistName);
  },
  addTracksToPlaylist: function (accessToken: string, playlistId: string, itemId: string): Promise<void> {
    return addSpotifyTrackToPlaylist(accessToken, playlistId, itemId);
  },
  addTracksToPlaylistBatch: function (
    accessToken: string,
    playlistId: string,
    itemIds: string[]
  ): Promise<void> {
    return addSpotifyTracksBatch(accessToken, playlistId, itemIds);
  },
};

const addSpotifyTrackToPlaylist = async (
  accessToken: string,
  playlistId: string,
  itemId: string
): Promise<void> => {
  return addSpotifyTracksBatch(accessToken, playlistId, [itemId]);
};

const addSpotifyTracksBatch = async (
  accessToken: string,
  playlistId: string,
  itemIds: string[]
): Promise<void> => {
  if (itemIds.length === 0) return;
  // Spotify allows up to 100 URIs per request
  // Simple chunking if > 100 (though logic likely handles small batches)
  let url: string = `${BASE_SPOTIFY_URL}/playlists/${playlistId}/tracks`;
  
  // Create chunks of 100
  for (let i = 0; i < itemIds.length; i += 100) {
    const chunk = itemIds.slice(i, i + 100);
    const spotifyUris = chunk.map(id => `spotify:track:${id}`);
    
    await axios.post(
      url,
      {
        uris: spotifyUris,
      },
      {
        headers: getHeaders(accessToken),
      }
    );
  }
};

const searchTrackSpotify = async (accessToken: string, query: string): Promise<string | null> => {
  let url: string = `${BASE_SPOTIFY_URL}/search?limit=1&q=${encodeURIComponent(query)}&type=track`;

  try {
    const response = await axios.get<any>(url, {
      headers: getHeaders(accessToken),
    });

    const topHitTrackId = response.data?.tracks?.items?.[0]?.id;
    return topHitTrackId || null;
  } catch (error) {
    console.error(`Search failed for "${query}":`, error);
    return null;
  }
};

const createSpotifyPlaylist = async (accessToken: string, providerUserId: string, playlistName: string) => {
  let url: string = `${BASE_SPOTIFY_URL}/users/${providerUserId}/playlists`;

  const response = await axios.post<any>(
    url,
    {
      name: playlistName,
      description: "Generate by Mixtape",
      public: false,
    },
    {
      headers: getHeaders(accessToken),
    }
  );

  return response.data.id;
};
