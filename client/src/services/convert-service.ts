import { TransferPayload, TransferProgress } from 'types/types';
import { api, ApiResponse } from './api';

export const startTransfer = async (transferPaylod: TransferPayload) => {
  const response = await api.post<ApiResponse<{ jobId: string }>>(
    '/transfer/start',
    transferPaylod,
  );

  if (!response.data.success && !!response.data.data?.jobId) {
    throw new Error(response.data.error || 'Failed to start transfer');
  }

  return response.data.data;
};

export const getTransferProgress = async (jobId: string) => {
  const response = await api.get<ApiResponse<TransferProgress>>(`transfer/progress/${jobId}`);

  if (!response.data.success) {
    throw new Error(response.data.error || 'Failed to get Transfer Progress');
  }

  return response.data.data;
};
