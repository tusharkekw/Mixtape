import { User } from 'types/types';
import { api } from './api';

export const getAccountApi = () => {
  return api.get('/auth/me');
};
