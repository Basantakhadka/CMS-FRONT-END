import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import AlertsPage from './AlertsPage';

const AlertsContainer = lazy(() => import('./containers/AlertsContainer'));

const AlertsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        {/* <Route path="/" element={<AlertsContainer />} /> */}
        <Route path="/" element={<AlertsPage />} />
      </Routes>
    </Suspense>
  );
};

export default AlertsRoutes;
