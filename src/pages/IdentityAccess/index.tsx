import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

const GeneralContainer = lazy(() => import('./General/containers/GeneralContainer'));
const UsersContainer = lazy(() => import('./Users/containers/UsersContainer'));
const RolesContainer = lazy(() => import('./Roles/containers/RolesContainer'));

const IdentityAccessRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/general" element={<GeneralContainer />} />
        <Route path="/users" element={<UsersContainer />} />
        <Route path="/roles" element={<RolesContainer />} />
      </Routes>
    </Suspense>
  );
};

export default IdentityAccessRoutes;
