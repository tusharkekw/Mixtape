import { useQuery } from '@tanstack/react-query';
import { getTransferProgress } from 'services/convert-service';

const useGetTransferProgress = (jobId: string) => {
  return useQuery({
    queryKey: ['transfer-progress', jobId],
    queryFn: () => getTransferProgress(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => (!!query.state?.data?.isJobCompleted ? 500 : false),
  });
};

export default useGetTransferProgress;
