import { UseQueryOptions as _UseQueryOptions } from '@tanstack/react-query';

export type UseQueryOptions = Omit<_UseQueryOptions, 'queryKey' | 'queryFn'>;
