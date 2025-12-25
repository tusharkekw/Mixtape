import { AccountResponse, User } from 'types/types';
import { api, ApiResponse } from './api';

export const getAccountApi = async (): Promise<AccountResponse> => {
  const response = await api.get<ApiResponse<AccountResponse>>('/auth/me');

  if (!response.data.data) {
    throw new Error(response.data.error);
  }
  return response.data.data;
};
