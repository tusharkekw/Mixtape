import axios from "axios";
import { getHeaders } from "./playlist-service";
import { Provider } from "@prisma/client";
import { Request, Response } from "express";

export const fetchPlaylistData = async (req: Request, res: Response) => {
  try {
    const { playlistId, platformId } = req.params;

    const user = req.user as any;

    if (!user) {
      return res.status(401).json({ msg: "User is not Logged in" });
    }

    const accessToken = user?.providers.find(
      (provider: Provider) => provider.provider === platformId
    )?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ success: false, error: "User is not connected to Source platform" });
    }

    let data;
    switch (platformId) {
      case "google":
        data = await fetchYoutubePlaylistItems(playlistId, accessToken);
        break;
      case "spotify":
        data = await fetchSpotifyPlaylistItems(playlistId, accessToken);
        break;
      default:
        return res.status(400).json({ success: false, error: "Invalid Platform" });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const fetchYoutubePlaylistItems = async (
  playlistId: string,
  accessToken: string
): Promise<PlaylistItem[]> => {
  let allItems: any[] = [];
  let nextPageToken: string | null = null;

  do {
    const response = await axios.get<YoutubePlaylistItemsResponse>(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        headers: getHeaders(accessToken),
        params: {
          part: "snippet",
          playlistId: playlistId,
          mine: true,
          maxResults: 50,
          pageToken: nextPageToken,
        },
      }
    );

    const data = response.data as any;

    allItems = [...allItems, ...data.items];
    nextPageToken = data.nextPageToken || null;
  } while (nextPageToken);

  return allItems.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.default?.url || "",
  }));
};

const fetchSpotifyPlaylistItems = async (
  playlistId: string,
  accessToken: string
): Promise<PlaylistItem[]> => {
  let allItems: any[] = [];
  let nextPageUrl: string | null = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

  while (nextPageUrl) {
    const response = await axios.get<SpotifyPlaylistItemsResponse>(nextPageUrl, {
      headers: getHeaders(accessToken),
    });

    const data = response.data as any;

    allItems = [...allItems, ...data.items];
    nextPageUrl = data.next || null;
  }

  return allItems?.map((item) => ({
    id: item.track?.id,
    title: item.track?.name,
    thumbnail: item.track?.album?.images?.[0]?.url ?? "",
  }));
};

type YoutubePlaylistItemsResponse = {
  items: any[];
  nextPageToken?: string;
};

type SpotifyPlaylistItemsResponse = {
  items: any[];
  next?: string;
};

type PlaylistItem = {
  id: string;
  title: string;
  thumbnail: string;
};

type YoutubeItem = {};

type SpotifyItem = {};
