import { Stack, Typography } from '@mui/material';
import { PlaylistItemType } from 'types/playlist-item.types';

const PlaylistItem: React.FC<{
  playlistItem: PlaylistItemType;
}> = ({ playlistItem }) => {
  const { title, thumbnail, id } = playlistItem;
  return (
    <Stack direction="row">
      <Stack
        key={playlistItem.id}
        direction="row"
        spacing={2}
        sx={{
          py: 0.5,
          px: 1,
          borderRadius: 1,
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <img
          src={playlistItem.thumbnail}
          style={{
            height: '60px',
            width: '60px',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '4px',
          }}
          alt="thumbnail"
        />
        <Typography variant="body2" fontWeight="600">
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default PlaylistItem;
