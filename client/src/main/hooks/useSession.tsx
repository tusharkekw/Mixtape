import { useGetAccount } from './useGetAccount';

const useSession = () => {
  const account = useGetAccount();

  return {
    user: account.data as any, //TODO
    isLoading: account.isLoading,
    hasSession: !!(account as any)?.data?.data?.authenticated,
    isError: account.isError,
  };
};

export default useSession;
