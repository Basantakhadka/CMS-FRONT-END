import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

const LoginContainer = lazy(() => import('./containers/LoginContainer'));

const AuthRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/" element={<LoginContainer />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
