import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ClientsContainer from './Container/ClientContainer';


const ClientRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<ClientsContainer />} />
        </Routes>
       
    </Suspense>
  );
};

export default ClientRoutes;
