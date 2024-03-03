import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import useGetPlaylistItems from "hooks/useGetPlaylistItems";

const PlaylistItem: React.FC<{ provider?: string, playlistId: string }> = ({provider, playlistId }) => {
  const { data: playlistItems, isLoading, 
    
   } = useGetPlaylistItems(provider,playlistId);

  if (isLoading) return <CircularProgress />;
  // if (error) return <Typography color="error">Failed to load songs</Typography>;

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
    {playlistItems.map((item, index: number) => (
      <Box key={index} display="flex" alignItems="center">
        {item.thumbnail && (
          <Avatar
            src={item.thumbnail}
            alt={item.title}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
        )}
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.artist}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
  );
};

export default PlaylistItem;