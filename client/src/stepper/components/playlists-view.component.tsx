import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGetPlatformPlaylists from 'hooks/useGetPlatformPlaylists';
import PlaylistItem from './playlist-item.component';
import { Platform } from './stepper.component';

interface PlaylistsViewProps {
  platform?: Platform;
}
export type PlaylistType = {
  thumbnail?: string;
  title: string;
  playlistId: string;
};

const PlaylistsView: React.FC<PlaylistsViewProps> = ({ platform }) => {
  const { data: playlists, error, isLoading } = useGetPlatformPlaylists(platform?.id);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load playlists</Typography>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="50%"
      margin="auto"
    >
      {playlists.map((playlist: PlaylistType) => (
        <Accordion
          key={playlist.playlistId}
          sx={{ width: '100%', mb: 2 }}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox sx={{ mr: 2 }} />
            <Box display="flex" alignItems="center">
              {playlist.thumbnail && (
                <Box
                  component="img"
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  sx={{ width: 50, height: 50, borderRadius: 1, mr: 2 }}
                />
              )}
              <Typography variant="h6">{playlist.title}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <PlaylistItem provider={platform?.id} playlistId={playlist.playlistId} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default PlaylistsView;
