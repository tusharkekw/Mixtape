import { useQuery as _useQuery, QueryFunction, QueryKey } from '@tanstack/react-query';
import { UseQueryOptions } from 'types/react-query.type';

export const useQuery = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  options?: UseQueryOptions,
) => {
  return _useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
