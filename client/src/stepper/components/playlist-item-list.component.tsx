import { CircularProgress, Stack } from '@mui/material';
import useGetPlaylistItems from 'stepper/hooks/useGetPlaylistItems';
import { PlaylistItemType } from 'types/playlist-item.types';
import PlaylistItem from './playlist-item.component';

const PlaylistItemList: React.FC<{
  platform: string;
  playlistId: string;
  onItemSelect: (
    item: PlaylistItemType,
    playlistItems: PlaylistItemType[],
    selected: boolean,
  ) => void;
  selectedItems: string | string[];
}> = ({ platform, playlistId, onItemSelect, selectedItems }) => {
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
      {playlistItems?.map((item: PlaylistItemType) => {
        const isSelected =
          typeof selectedItems === 'string' ? true : selectedItems.includes(item.id);
        return (
          <PlaylistItem
            playlistItem={item}
            onItemSelect={(selected) => onItemSelect(item, playlistItems, selected)}
            isSelected={isSelected}
          />
        );
      })}
    </>
  );
};

export default PlaylistItemList;
