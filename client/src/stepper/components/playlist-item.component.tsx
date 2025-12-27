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
    <Stack 
      direction="row" 
      spacing={1.5}
      sx={{
        alignItems: 'center',
        py: 1,
        px: 1.5,
        borderRadius: 1.5,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          bgcolor: '#ffffff',
        },
      }}
    >
      <Checkbox
        checked={isSelected}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        size="small"
        sx={{
          color: '#9ca3af',
          '&.Mui-checked': {
            color: '#3b82f6',
          },
        }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <img
          src={playlistItem.thumbnail}
          style={{
            height: '48px',
            width: '48px',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '6px',
          }}
          alt="thumbnail"
        />
        <Typography 
          variant="body2" 
          fontWeight={500}
          sx={{
            color: '#374151',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default PlaylistItem;
