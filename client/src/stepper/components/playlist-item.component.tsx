import { Checkbox, Stack, Typography } from '@mui/material';
import { PlaylistItemType } from 'types/playlist-item.types';

const PlaylistItem: React.FC<{
  playlistItem: PlaylistItemType;
  isSelected: boolean;
  onItemSelect: (selected: boolean) => void;
}> = ({ playlistItem, isSelected, onItemSelect }) => {
  const { title, thumbnail, id } = playlistItem;

  const handleChange = () => {
    console.log(isSelected);
    onItemSelect(!isSelected);
  };
  return (
    <Stack direction="row">
      <Checkbox
        checked={isSelected}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
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
