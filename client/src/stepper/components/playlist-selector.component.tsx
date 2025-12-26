import useGetPlaylists from 'stepper/hooks/useGetPlaylists';
import { TransferState } from './transfer.component';
import { Box, Stack } from '@mui/material';
import PlaylistTile from './playlist-tile.component';
import { Playlist, PlaylistItemType } from 'types/playlist-item.types';

const PlaylistSelector: React.FC<{
  platform: string;
  transferState: TransferState;
  onTransferStateChange: (newState: Partial<TransferState>) => void;
}> = ({ platform, transferState, onTransferStateChange }) => {
  const { data, isLoading, isError } = useGetPlaylists(platform);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error fetching playlist</>;
  }

  const handlePlaylistSelect = (playlist: Playlist, selected: boolean) => {
    const currentPlaylists = transferState.selectedPlaylist || {};

    const updatedPlaylists = { ...currentPlaylists };

    if (selected) {
      updatedPlaylists[playlist.id] = {
        isPlaylistSelected: true,
        playlistData: playlist,
        selectedItems: [],
      };
    } else {
      updatedPlaylists[playlist.id] = {
        isPlaylistSelected: false,
        playlistData: playlist,
        selectedItems: [],
      };
    }

    onTransferStateChange({
      selectedPlaylist: updatedPlaylists,
    });
  };

  const handleItemSelect = (
    playlist: Playlist,
    item: PlaylistItemType,
    playlistItems: PlaylistItemType[],
    selected: boolean,
  ) => {
    const playlistId = playlist.id;
    const updatedPlaylists = { ...transferState.selectedPlaylist };
    const currentPlaylist = updatedPlaylists[playlistId] || {
      selectedItems: [],
      isPlaylistSelected: false,
      playlistData: {},
    };

    if (selected) {
      updatedPlaylists[playlistId] = {
        isPlaylistSelected: true,
        playlistData: playlist,
        selectedItems: [...currentPlaylist?.selectedItems, item],
      };
    } else {
      let currentSelectedPlaylistItems = currentPlaylist.selectedItems;

      if (currentSelectedPlaylistItems.length === 0 && currentPlaylist.isPlaylistSelected) {
        //complete playlist was selected previously
        updatedPlaylists[playlistId] = {
          isPlaylistSelected: true,
          playlistData: playlist,
          selectedItems: [
            ...playlistItems.filter((playlistItem) => playlistItem.id !== item.id),
          ],
        };
      } else {
        let newPlaylistItems = currentSelectedPlaylistItems.filter(
          (playlistItem) => playlistItem.id !== item.id,
        );

        if (newPlaylistItems.length === 0 && currentPlaylist.isPlaylistSelected) {
          ////last element was removed
          updatedPlaylists[playlistId] = {
            isPlaylistSelected: false,
            playlistData: playlist,
            selectedItems: [],
          };
        } else {
          updatedPlaylists[playlistId] = {
            isPlaylistSelected: true,
            playlistData: playlist,
            selectedItems: newPlaylistItems,
          };
        }
      }
    }

    onTransferStateChange({
      selectedPlaylist: updatedPlaylists,
    });
  };
  console.log(transferState);

  return (
    <Box>
      <div>Playlist Selector</div>
      <Stack>
        {data?.map((playlist) => {
          const isPlaylistSelected =
            transferState.selectedPlaylist[playlist.id]?.isPlaylistSelected;
          const selectedItems = isPlaylistSelected
            ? transferState.selectedPlaylist[playlist.id]?.selectedItems.length === 0
              ? 'all'
              : transferState.selectedPlaylist[playlist.id].selectedItems.map(
                  (item) => item.id,
                )
            : [];
          return (
            <>
              <PlaylistTile
                key={playlist.id}
                platform={platform}
                playlist={playlist}
                onPlaylistSelect={handlePlaylistSelect}
                onItemSelect={handleItemSelect}
                selectedItems={selectedItems}
                isSelected={isPlaylistSelected}
              />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PlaylistSelector;
