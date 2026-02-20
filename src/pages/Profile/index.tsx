import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ProfileContainer from './containers/ProfileContainer';





const ProfileRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>}>
      <Routes>
        <Route path="/" element={<ProfileContainer />} />
    
      </Routes>
    </Suspense>
  );
};

export default ProfileRoutes;
