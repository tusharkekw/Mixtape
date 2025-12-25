import { useQuery } from '@tanstack/react-query';
import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect } from 'react';
import { getAccountApi } from 'services/auth-service';
import { AccountResponse } from 'types/types';

export const useGetAccount = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

  const query = useQuery<AccountResponse>({
    queryKey: ['me'],
    queryFn: getAccountApi,
    enabled: !isAuthenticated,
  });

  //react-query has deprecated onSuccess callback
  useEffect(() => {
    if (query) {
      setIsAuthenticated(!!query.data?.isAuthenticated);
      setUser(query.data?.user);
    }
  }, [query, setIsAuthenticated, setUser]);

  return query;
};
