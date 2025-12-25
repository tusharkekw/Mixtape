import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchPlaylistItems } from 'services/fetch-service';
import { Playlist } from 'types/playlist-item.types';

const useGetPlaylistItems = (
  platform: string,
  playlistId: string,
  options?: UseQueryOptions,
) => {
  return useQuery<Playlist[]>({
    queryKey: ['playlists-items', platform, playlistId],
    queryFn: () => fetchPlaylistItems(platform, playlistId),
  });
};

export default useGetPlaylistItems;
