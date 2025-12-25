import { Collapse, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Playlist } from 'types/playlist-item.types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlaylistItemList from './playlist-item-list.component';

const PlaylistTile: React.FC<{ platform: string; playlist: Playlist }> = ({
  platform,
  playlist,
}) => {
  const { id, title, thumbnail } = playlist;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
          borderRadius: 1,
          bgcolor: expanded ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.08)',
          },
          transition: 'background-color 0.3s ease',
        }}
        spacing={2}
      >
        <Stack
          onClick={handleClick}
          direction="row"
          spacing="2"
          width="100%"
          justifyContent="space-between"
        >
          <img
            src={thumbnail}
            style={{
              height: '60px',
              width: '60px',
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '4px',
            }}
            alt="thumbnail"
          />
          <Typography variant="body1" fontWeight="600">
            {title}
          </Typography>
        </Stack>
        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Stack>
      <Collapse in={expanded} timeout="auto">
        <Stack
          spacing={1}
          sx={{
            ml: 9,
            pl: 2,
            py: 1,
            borderLeft: '2px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          {expanded && <PlaylistItemList platform={platform} playlistId={id} />}
        </Stack>
      </Collapse>
    </>
  );
};

export default PlaylistTile;
