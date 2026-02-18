import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import AddAlertsContainer from './containers/AddAlertsContainer';

const ContractAlertContainer = lazy(() => import('./containers/ContractAlertContainer'));

const AlertsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<ContractAlertContainer />} />
        <Route path="/add" element={<AddAlertsContainer />} />
         <Route path="/edit/:id" element={<AddAlertsContainer />} />
      </Routes>
    </Suspense>
  );
};

export default AlertsRoutes;
