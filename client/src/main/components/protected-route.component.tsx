import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useSession from 'main/hooks/useSession';

const ProtectedRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const { isLoading, hasSession } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasSession) {
    return <Navigate to={'/login'} />;
  }

  return element;
};

export default ProtectedRoute;
