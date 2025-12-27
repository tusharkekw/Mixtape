import { Checkbox, Collapse, Stack, Typography, Card, Box, Chip } from '@mui/material';
import { useState } from 'react';
import { Playlist, PlaylistItemType } from 'types/playlist-item.types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlaylistItemList from './playlist-item-list.component';

const PlaylistTile: React.FC<{
  platform: string;
  playlist: Playlist;
  isSelected: boolean;
  onPlaylistSelect: (playlist: Playlist, selected: boolean) => void;
  onItemSelect: (
    playlist: Playlist,
    item: PlaylistItemType,
    playlistItems: PlaylistItemType[],
    selected: boolean,
  ) => void;
  selectedItems: string | string[];
}> = ({ platform, playlist, isSelected, onPlaylistSelect, onItemSelect, selectedItems }) => {
  const { id, title, thumbnail } = playlist;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPlaylistSelect(playlist, event.target.checked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          p: 2,
          bgcolor: isSelected ? '#f0f9ff' : '#ffffff',
          borderBottom: expanded ? '1px solid #e5e7eb' : 'none',
          transition: 'background-color 0.2s ease',
        }}
        spacing={2}
      >
        <Checkbox
          checked={!!isSelected}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{
            color: '#9ca3af',
            '&.Mui-checked': {
              color: '#3b82f6',
            },
          }}
        />
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
            src={thumbnail}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt="thumbnail"
          />
        </Box>
        <Stack
          onClick={handleClick}
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            minWidth: 0,
          }}
        >
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
            {title}
          </Typography>
          {isSelected && (
            <Chip
              label="Selected"
              size="small"
              sx={{
                mt: 0.5,
                height: 20,
                fontSize: '0.7rem',
                bgcolor: '#dbeafe',
                color: '#1e40af',
                fontWeight: 600,
                width: 'fit-content',
              }}
            />
          )}
        </Stack>
        <Box
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              color: '#3b82f6',
            },
          }}
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </Stack>
      <Collapse in={expanded} timeout="auto">
        <Box
          sx={{
            bgcolor: '#f9fafb',
            p: 2,
          }}
        >
          {expanded && (
            <PlaylistItemList
              platform={platform}
              playlistId={id}
              onItemSelect={(
                item: PlaylistItemType,
                playlistItems: PlaylistItemType[],
                selected: boolean,
              ) => onItemSelect(playlist, item, playlistItems, selected)}
              selectedItems={selectedItems}
            />
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

export default PlaylistTile;
