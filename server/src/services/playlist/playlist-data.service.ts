import axios from "axios";
import { getHeaders } from "./playlist-service";
import { Provider } from "@prisma/client";
import { Request, Response } from "express";

export const fetchPlaylistData = async (req: Request, res: Response) => {
  const { playlistId, platformId } = req.params;

  const user = req.user as any;

  if (!user) {
    res.status(401);
  }

  const accessToken = user?.providers.find(
    (provider: Provider) => provider.provider === platformId
  )?.accessToken;

  if (!accessToken) {
    return res.status(401);
  }

  switch (platformId) {
    case "google":
      fetchYoutubePlaylistItems(playlistId, accessToken);
    case "spotify":
      fetchSpotifyPlaylistItems(playlistId, accessToken);
  }
};

const fetchYoutubePlaylistItems = async (playlistId: string, accessToken: string) => {
  let allItems: any[] = [];
  let nextPageToken: string | null = null;

  do {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
      headers: getHeaders(accessToken),
      params: {
        part: "snippet",
        playlistId: playlistId,
        mine: true,
        maxResults: 50,
        pageToken: nextPageToken,
      },
    });

    const data = response.data as any;

    allItems = [...allItems, ...data.items];
    nextPageToken = data.nextPageToken || null;
  } while (nextPageToken);

  return allItems;
};

const fetchSpotifyPlaylistItems = async (playlistId: string, accessToken: string) => {
  let allItems: any[] = [];
  let nextPageUrl: string | null = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

  while (nextPageUrl) {
    const response = await axios.get(nextPageUrl, {
      headers: getHeaders(accessToken),
    });

    const data = response.data as any;

    allItems = [...allItems, ...data.items];
    nextPageUrl = data.next || null;
  }

  return allItems;
};

type YoutubePlaylistItemsResponse = {
  items: any[];
  nextPageToken?: string;
};

type SpotifyPlaylistItemsResponse = {
  items: any[];
  next?: string;
};
