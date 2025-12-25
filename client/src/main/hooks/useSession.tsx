import { useGetAccount } from './useGetAccount';

const useSession = () => {
  const account = useGetAccount();

  return {
    user: account.data?.user,
    isLoading: account.isLoading,
    hasSession: account.data?.isAuthenticated,
    isError: account.isError,
  };
};

export default useSession;
