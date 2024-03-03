import axios from 'axios';
import { useEffect, useState } from 'react';
import { PlaylistType } from 'stepper/components/playlists-view.component';

const useGetPlatformPlaylists = (platformId?: string) => {
  const [data, setData] = useState<PlaylistType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/fetch/${platformId}`, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [platformId]);

  return { data, error, isLoading };
};

export default useGetPlatformPlaylists;
