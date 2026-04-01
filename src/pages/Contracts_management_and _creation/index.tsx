import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import AddContractContainer from './containers/AddContractContainer';

const ContractsTabsContainer = lazy(() => import('./containers/ContractsTabsContainer'));

const IdentityAccessRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<ContractsTabsContainer />} />
        <Route path="/createContract" element={<AddContractContainer />} />
         <Route path="/createContract/:id" element={<AddContractContainer />} />

      </Routes>
    </Suspense>
  );
};

export default IdentityAccessRoutes;
