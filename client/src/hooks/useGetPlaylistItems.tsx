import axios from 'axios';
import { useEffect, useState } from 'react';

export type PlaylistItemType = {
  thumbnail?: string;
  title: string;
  artist: string;
};

const useGetPlaylistItems = (provider?: string, playlistId?: string) => {
  const [data, setData] = useState<PlaylistItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/fetch/${provider}/${playlistId}`,
          {
            withCredentials: true,
          },
        );
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [playlistId, provider]);

  return { data, error, isLoading };
};

export default useGetPlaylistItems;
