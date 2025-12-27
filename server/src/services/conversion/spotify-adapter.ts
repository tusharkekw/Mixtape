import axios from "axios";
import { PlatformAdapter } from "../../type";
import { fetchSpotifyPlaylistItems } from "../playlist/playlist-item.service";
import { getHeaders } from "../playlist/playlist-service";

const BASE_SPOTIFY_URL = "https://api.spotify.com/v1";

export const SpotifyAdapter: PlatformAdapter = {
  getPlaylistTracks: function (accessToken: string, playlistId: string): Promise<any> {
    return fetchSpotifyPlaylistItems(playlistId, accessToken);
  },
  searchTrack: function (accessToken: string, query: string): Promise<string> {
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
};

const addSpotifyTrackToPlaylist = async (
  accessToken: string,
  playlistId: string,
  itemId: string
): Promise<void> => {
  let url: string = `${BASE_SPOTIFY_URL}/playlists/${playlistId}/tracks`;
  const spotifyUris = [`spotify:track:${itemId}`];
  const response = await axios.post(
    url,
    {
      uris: spotifyUris,
    },
    {
      headers: getHeaders(accessToken),
    }
  );

  const data = response.data;
  return;
};

const searchTrackSpotify = async (accessToken: string, query: string): Promise<string> => {
  let url: string = `${BASE_SPOTIFY_URL}/search?limit=5&q=${query}&type=track`;

  const response = await axios.get<any>(url, {
    headers: getHeaders(accessToken),
  });

  const topHitTrackId = response.data?.tracks?.items[0]?.id;

  return topHitTrackId;
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
