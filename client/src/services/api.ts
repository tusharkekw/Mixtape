import axios from 'axios';

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  withCredentials: true,
});
