import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { startTransfer } from 'services/convert-service';

const useStartTransfer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: startTransfer,
    onSuccess: (data) => {
      const jobId = data?.jobId;

      console.log('transfer started', data?.jobId);
      if (jobId) {
        sessionStorage.setItem('jobId', data?.jobId!);
        navigate(`/transfer/progress/${jobId}`);
      }
    },
    onError: (error) => {
      console.log('Encountered error while starting transfer', error);
    },
  });
};

export default useStartTransfer;
