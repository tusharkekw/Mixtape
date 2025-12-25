import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { TransferState } from './transfer.component';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse } from '@mui/material';
import { PlaylistItemType } from 'types/playlist-item.types';

// Transfer modes
enum TransferMode {
  UNIFIED = 'unified',
  INDIVIDUAL = 'individual',
}

const FinalizeTransfer: React.FC<{
  transferState: TransferState;
}> = ({ transferState }) => {
  const { sourcePlatform, destinationPlatform, selectedPlaylist, newPlaylistName } =
    transferState;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [unifiedPlaylistName, setUnifiedPlaylistName] = useState(newPlaylistName || '');
  const [transferMode, setTransferMode] = useState<TransferMode>(TransferMode.INDIVIDUAL);

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnifiedPlaylistName(event.target.value);
  };

  const handleTransferModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferMode(event.target.value as TransferMode);
  };

  const handleToggleExpand = (playlistId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [playlistId]: !prev[playlistId],
    }));
  };

  // Filter only selected playlists
  const selectedPlaylists = Object.entries(selectedPlaylist)
    .filter(([_, data]) => data.isPlaylistSelected)
    .map(([id, data]) => ({
      id,
      ...data,
    }));

  const totalTracksCount = selectedPlaylists.reduce((acc, playlist) => {
    // If selectedItems is empty array, it means all items are selected
    const itemCount =
      playlist.selectedItems.length === 0
        ? playlist.playlistData.itemCount || 0
        : playlist.selectedItems.length;
    return acc + itemCount;
  }, 0);

  const handleTransfer = () => {
    // Implement the transfer logic based on selected mode
    if (transferMode === TransferMode.UNIFIED) {
      console.log('Creating unified playlist:', unifiedPlaylistName);
      console.log('With tracks from:', selectedPlaylists);
    } else {
      console.log(
        'Transferring individual playlists with original names:',
        selectedPlaylists,
      );
    }
  };

  const isTransferButtonDisabled =
    selectedPlaylists.length === 0 ||
    (transferMode === TransferMode.UNIFIED && !unifiedPlaylistName.trim());

  if (selectedPlaylists.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">No playlists selected</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Please go back and select at least one playlist to transfer.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Finalize Your Transfer
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          Transferring from <strong>{sourcePlatform?.toUpperCase()}</strong> to{' '}
          <strong>{destinationPlatform?.toUpperCase()}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedPlaylists.length} playlist(s) selected with a total of {totalTracksCount}{' '}
          tracks
        </Typography>
      </Box>

      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <FormLabel component="legend">Transfer Method</FormLabel>
        <RadioGroup value={transferMode} onChange={handleTransferModeChange}>
          <FormControlLabel
            value={TransferMode.INDIVIDUAL}
            control={<Radio />}
            label="Keep playlists separate (preserve original names and structure)"
          />
          <FormControlLabel
            value={TransferMode.UNIFIED}
            control={<Radio />}
            label="Combine into a single playlist"
          />
        </RadioGroup>
      </FormControl>

      {transferMode === TransferMode.UNIFIED && (
        <TextField
          fullWidth
          label="Unified Playlist Name"
          variant="outlined"
          value={unifiedPlaylistName}
          onChange={handlePlaylistNameChange}
          placeholder="Enter a name for your combined playlist"
          sx={{ mb: 4 }}
          required
        />
      )}

      <Typography variant="subtitle1" gutterBottom>
        Selected Playlists:
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {selectedPlaylists.map((playlist) => (
          <Box
            key={playlist.id}
            sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 1 }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                padding: 2,
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
                borderRadius: 1,
              }}
              spacing={2}
              onClick={() => handleToggleExpand(playlist.id)}
            >
              <img
                src={playlist.playlistData.thumbnail}
                style={{
                  height: '60px',
                  width: '60px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '4px',
                }}
                alt="thumbnail"
              />
              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="600">
                  {playlist.playlistData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {playlist.selectedItems.length === 0
                    ? `All tracks selected (${playlist.playlistData.itemCount})`
                    : `${playlist.selectedItems.length} tracks selected`}
                </Typography>
              </Stack>
              {expanded[playlist.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Stack>

            <Collapse in={expanded[playlist.id]} timeout="auto">
              <Stack
                spacing={1}
                sx={{
                  p: 2,
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                {playlist.selectedItems.length > 0 ? (
                  playlist.selectedItems.map((item: PlaylistItemType) => (
                    <SelectedPlaylistItem key={item.id} item={item} />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    All tracks from this playlist will be transferred.
                  </Typography>
                )}
              </Stack>
            </Collapse>
          </Box>
        ))}
      </Stack>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleTransfer}
        disabled={isTransferButtonDisabled}
      >
        {transferMode === TransferMode.UNIFIED
          ? 'Create Unified Playlist'
          : `Transfer ${selectedPlaylists.length} Playlist${
              selectedPlaylists.length > 1 ? 's' : ''
            }`}
      </Button>
    </Box>
  );
};

const SelectedPlaylistItem: React.FC<{ item: PlaylistItemType }> = ({ item }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 1 }}>
      <img
        src={item.thumbnail}
        style={{
          height: '40px',
          width: '40px',
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '4px',
        }}
        alt="thumbnail"
      />
      <Typography variant="body2">{item.title}</Typography>
    </Stack>
  );
};

export default FinalizeTransfer;
