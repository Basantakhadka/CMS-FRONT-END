import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

const SettingsContainer = lazy(() => import('./containers/SettingsContainer'));

const SettingsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<SettingsContainer />} />
      </Routes>
    </Suspense>
  );
};

export default SettingsRoutes;
