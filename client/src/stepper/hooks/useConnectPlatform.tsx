import useSession from 'main/hooks/useSession';
import { useEffect } from 'react';

const useConnectPlatform = (isEnabled: boolean, providerName?: string) => {
  const { user, isLoading } = useSession();

  useEffect(() => {
    if (isEnabled && providerName && user && !isLoading) {
      const isPlatformConnected = user.connectedPlatforms?.includes(providerName);
      if (!isPlatformConnected) {
        window.location.href = `http://127.0.0.1:3001/connect/${providerName}/`;
      }
    }
  }, [isEnabled, providerName, user, isLoading]);
};

export default useConnectPlatform;
