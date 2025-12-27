import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetTransferProgress from 'stepper/hooks/useGetTransferProgress';

const TransferProgress: React.FC = () => {
  const { jobId } = useParams();
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetTransferProgress(jobId ?? '');

  useEffect(() => {
    if (!isLoading && isLoadingFirstTime) {
      setIsLoadingFirstTime(false);
    }
  }, [isLoading, isLoadingFirstTime]);

  if (!jobId) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography>No active transfer found</Typography>
        <Button onClick={() => navigate('/transfer')}>Start New Transfer</Button>
      </Box>
    );
  }

  if (isLoadingFirstTime && isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <>Error Getting Transfer Progress</>;
  }

  const progress = data?.progress;

  return (
    <Box sx={{ width: '60%', mx: 'auto', mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Transferring playlists
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 1 }}
      />

      {/* <Typography mt={2}>
        {data?.successful} / {data?.totalTracks} tracks transferred
      </Typography> */}
    </Box>
  );
};

export default TransferProgress;
