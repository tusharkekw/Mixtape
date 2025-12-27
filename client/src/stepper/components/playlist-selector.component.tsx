import useGetPlaylists from 'stepper/hooks/useGetPlaylists';
import { TransferState } from './transfer.component';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import PlaylistTile from './playlist-tile.component';
import { Playlist, PlaylistItemType } from 'types/playlist-item.types';

const PlaylistSelector: React.FC<{
  platform: string;
  transferState: TransferState;
  onTransferStateChange: (newState: Partial<TransferState>) => void;
}> = ({ platform, transferState, onTransferStateChange }) => {
  const { data, isLoading, isError } = useGetPlaylists(platform);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error">Error fetching playlists</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please try again later
        </Typography>
      </Box>
    );
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
    <Box sx={{ py: 3 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: '#1f2937',
        }}
      >
        Select Playlists to Transfer
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 4,
          color: '#6b7280',
        }}
      >
        Choose entire playlists or expand to select individual tracks
      </Typography>
      <Grid container spacing={2}>
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
            <Grid item xs={12} key={playlist.id}>
              <PlaylistTile
                platform={platform}
                playlist={playlist}
                onPlaylistSelect={handlePlaylistSelect}
                onItemSelect={handleItemSelect}
                selectedItems={selectedItems}
                isSelected={isPlaylistSelected}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PlaylistSelector;
