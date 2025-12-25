import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchPlaylists } from 'services/fetch-service';
import { Playlist } from 'types/playlist-item.types';

const useGetPlaylists = (platform: string, options?: UseQueryOptions) => {
  return useQuery<Playlist[]>({
    queryKey: ['playlists', platform],
    queryFn: () => fetchPlaylists(platform),
  });
};

export default useGetPlaylists;
