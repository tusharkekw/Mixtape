import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useSession from 'main/hooks/useSession';

const UnAuthenticatedRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const { hasSession, isLoading } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasSession) {
    return <Navigate to="/transfer" />;
  }

  return element;
};

export default UnAuthenticatedRoute;
