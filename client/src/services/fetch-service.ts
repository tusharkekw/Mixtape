import { Playlist } from 'types/playlist-item.types';
import { api, ApiResponse } from './api';

export const fetchPlaylists = async (platform: string) => {
  const response = await api.get<ApiResponse<Playlist[]>>(`/fetch/playlist/${platform}`);

  if (!response.data.success) {
    throw new Error(response.data.error || 'failed to fetch playlists');
  }

  return response.data.data ?? [];
};

export const fetchPlaylistItems = async (platform: string, playlistId: string) => {
  const response = await api.get<ApiResponse<Playlist[]>>(
    `/fetch/playlist-items/${platform}/${playlistId}`,
  );

  if (!response.data.success) {
    throw new Error(response.data.error || 'failed to fetch playlist items');
  }

  return response.data.data ?? [];
};
