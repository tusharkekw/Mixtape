import { CircularProgress, Stack } from '@mui/material';
import useGetPlaylistItems from 'stepper/hooks/useGetPlaylistItems';
import { PlaylistItemType } from 'types/playlist-item.types';
import PlaylistItem from './playlist-item.component';

const PlaylistItemList: React.FC<{
  platform: string;
  playlistId: string;
}> = ({ platform, playlistId }) => {
  const {
    data: playlistItems,
    isLoading,
    isError,
  } = useGetPlaylistItems(platform, playlistId);

  if (isLoading) {
    return (
      <Stack direction="row" justifyContent="center" py={2}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (isError) {
    return <>Error fetching Playlist Items</>;
  }

  return (
    <>
      {playlistItems?.map((item: PlaylistItemType) => (
        <PlaylistItem playlistItem={item} />
      ))}
    </>
  );
};

export default PlaylistItemList;
