import { AuthContext } from 'context/AuthContext';
import { useQuery } from 'hooks/useQuery';
import { useContext, useEffect } from 'react';
import { getAccountApi } from 'services/auth-service';
import { User } from 'types/types';

export const useGetAccount = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

  const query = useQuery(['me'], getAccountApi, {
    enabled: !isAuthenticated,
  });

  //react-query has deprecated onSuccess callback
  useEffect(() => {
    if (query) {
      console.log((query as any)?.data?.data);
      setIsAuthenticated(!!(query as any)?.data?.data?.authenticated);
      setUser(query.data as User);
    }
  }, [query, setIsAuthenticated, setUser]);

  return query;
};
