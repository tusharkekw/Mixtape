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
import useStartTransfer from 'stepper/hooks/useStartTransfer';
import { TransferPayload } from 'types/types';

// Transfer modes
export enum TransferMode {
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
  const { mutate: startTransfer } = useStartTransfer();

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnifiedPlaylistName(event.target.value);
  };

  const handleTransferModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferMode(event.target.value as TransferMode);
    setUnifiedPlaylistName('');
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
    if (transferMode === TransferMode.UNIFIED) {
      console.log('Creating unified playlist:', unifiedPlaylistName);
      console.log('With tracks from:', selectedPlaylists);
    } else {
      console.log(
        'Transferring individual playlists with original names:',
        selectedPlaylists,
      );
    }

    const payload: TransferPayload = {
      source: transferState.sourcePlatform!,
      destination: transferState.destinationPlatform!,
      selectedPlaylist: transferState.selectedPlaylist,
      transferMode,
      playlistName: unifiedPlaylistName,
    };

    startTransfer(payload);
  };

  const isTransferButtonDisabled =
    selectedPlaylists.length === 0 ||
    (transferMode === TransferMode.UNIFIED && !unifiedPlaylistName.trim());

  if (selectedPlaylists.length === 0) {
    return (
      <Box 
        sx={{ 
          mt: 4, 
          textAlign: 'center',
          bgcolor: '#ffffff',
          borderRadius: 2,
          p: 6,
          border: '1px solid #e5e7eb',
        }}
      >
        <Typography variant="h6" sx={{ color: '#1f2937', mb: 1 }}>
          No playlists selected
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please go back and select at least one playlist to transfer.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2,
          fontWeight: 600,
          color: '#1f2937',
        }}
      >
        Finalize Your Transfer
      </Typography>

      <Box 
        sx={{ 
          mb: 4,
          p: 3,
          bgcolor: '#f0f9ff',
          borderRadius: 2,
          border: '1px solid #bfdbfe',
        }}
      >
        <Typography variant="body1" sx={{ mb: 1, color: '#1f2937' }}>
          Transferring from <strong>{sourcePlatform?.toUpperCase()}</strong> to{' '}
          <strong>{destinationPlatform?.toUpperCase()}</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          {selectedPlaylists.length} playlist(s) selected with a total of {totalTracksCount}{' '}
          tracks
        </Typography>
      </Box>

      <FormControl 
        component="fieldset" 
        sx={{ 
          mb: 4,
          width: '100%',
        }}
      >
        <FormLabel 
          component="legend"
          sx={{
            color: '#1f2937',
            fontWeight: 600,
            mb: 1.5,
          }}
        >
          Transfer Method
        </FormLabel>
        <RadioGroup value={transferMode} onChange={handleTransferModeChange}>
          <FormControlLabel
            value={TransferMode.INDIVIDUAL}
            control={<Radio />}
            label="Keep playlists separate (preserve original names and structure)"
            sx={{
              mb: 1,
              '& .MuiFormControlLabel-label': {
                fontSize: '0.95rem',
              },
            }}
          />
          <FormControlLabel
            value={TransferMode.UNIFIED}
            control={<Radio />}
            label="Combine into a single playlist"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.95rem',
              },
            }}
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

      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2,
          fontWeight: 600,
          color: '#1f2937',
        }}
      >
        Selected Playlists:
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {selectedPlaylists.map((playlist) => (
          <Box
            key={playlist.id}
            sx={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: '#ffffff',
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                p: 2,
                bgcolor: '#f9fafb',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  bgcolor: '#f3f4f6',
                },
              }}
              spacing={2}
              onClick={() => handleToggleExpand(playlist.id)}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={playlist.playlistData.thumbnail}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  alt="thumbnail"
                />
              </Box>
              <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography 
                  variant="body1" 
                  fontWeight={600}
                  sx={{
                    color: '#1f2937',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {playlist.playlistData.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  {playlist.selectedItems.length === 0
                    ? `All tracks selected (${playlist.playlistData.itemCount})`
                    : `${playlist.selectedItems.length} tracks selected`}
                </Typography>
              </Stack>
              <Box
                sx={{
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {expanded[playlist.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Box>
            </Stack>

            <Collapse in={expanded[playlist.id]} timeout="auto">
              <Stack
                spacing={1}
                sx={{
                  p: 2,
                  bgcolor: '#f9fafb',
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                {playlist.selectedItems.length > 0 ? (
                  playlist.selectedItems.map((item: PlaylistItemType) => (
                    <SelectedPlaylistItem key={item.id} item={item} />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#6b7280', fontStyle: 'italic' }}>
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
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
          },
          '&:disabled': {
            bgcolor: '#e5e7eb',
            color: '#9ca3af',
          },
        }}
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
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        py: 1,
        px: 1.5,
        borderRadius: 1.5,
        bgcolor: '#ffffff',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={item.thumbnail}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          alt="thumbnail"
        />
      </Box>
      <Typography 
        variant="body2"
        sx={{
          color: '#374151',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {item.title}
      </Typography>
    </Stack>
  );
};

export default FinalizeTransfer;
