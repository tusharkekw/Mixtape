import axios from "axios";
import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { Provider } from "@prisma/client";

export const fetchPlaylist = async (req: Request, res: Response) => {
  try {
    const { platformId } = req.params;

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
        data = await fetchGooglePlaylist(accessToken);
        break;
      case "spotify":
        data = await fetchSpotifyPlaylist(accessToken);
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

const fetchGooglePlaylist = async (accessToken: string): Promise<Playlist[]> => {
  const { data } = await axios.get<GooglePlaylistResponse>(
    "https://www.googleapis.com/youtube/v3/playlists",
    {
      headers: getHeaders(accessToken),
      params: { part: "snippet,contentDetails", mine: true, maxResults: 50 },
    }
  );

  return data.items?.map((playlist) => ({
    id: playlist.id,
    title: playlist.snippet.title,
    thumbnail: playlist.snippet?.thumbnails?.high?.url ?? "",
    platform: "google",
  }));
};

const fetchSpotifyPlaylist = async (accessToken: string): Promise<Playlist[]> => {
  const { data } = await axios.get<SpotifyPlaylistResponse>("https://api.spotify.com/v1/me/playlists", {
    headers: getHeaders(accessToken),
    params: {},
  });

  return data.items?.map((playlist) => ({
    id: playlist.id,
    title: playlist.name,
    thumbnail: playlist.images?.[0]?.url ?? "",
    platform: "spotify",
  }));
};

export const getHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export type SpotifyPlaylistItem = {
  id: string;
  name: string;
  images: { url: string }[];
};

export type SpotifyPlaylistResponse = {
  items: SpotifyPlaylistItem[];
};

export type GooglePlaylistItem = {
  id: string;
  snippet: {
    title: string;
    thumbnails?: {
      high?: { url: string };
    };
  };
};

export type GooglePlaylistResponse = {
  items: GooglePlaylistItem[];
};

export type Playlist = {
  id: string;
  title: string;
  thumbnail: string;
  platform: "google" | "spotify";
};
