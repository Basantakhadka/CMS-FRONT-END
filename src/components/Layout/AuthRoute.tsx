import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
  element: React.ReactElement;
  isAuthorized: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, isAuthorized }) => {
  return isAuthorized ? element : <Navigate to="/" replace />;
};

export default AuthRoute;