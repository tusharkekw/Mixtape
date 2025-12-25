import useGetPlaylists from 'stepper/hooks/useGetPlaylists';
import { TransferState } from './transfer.component';
import { Box, Stack } from '@mui/material';
import PlaylistTile from './playlist-tile.component';

const PlaylistSelector: React.FC<{
  platform: string;
  transferState: TransferState;
  onTransferStateChange: (newState: Partial<TransferState>) => void;
}> = ({ platform, transferState, onTransferStateChange }) => {
  const { data, isLoading, isError } = useGetPlaylists(platform);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error fetching playlist</>;
  }

  return (
    <Box>
      <div>Playlist Selector</div>
      <Stack>
        {data?.map((playlist) => {
          return (
            <>
              <PlaylistTile key={playlist.id} platform={platform} playlist={playlist} />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PlaylistSelector;
