import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

const DashboardContainer = lazy(() => import('./containers/DashboardContainer'));

const DashboardRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<DashboardContainer />} />
      </Routes>
    </Suspense>
  );
};

export default DashboardRoutes;
