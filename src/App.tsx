import { Suspense, lazy } from 'react';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import './App.css';

// Lazy load page modules
const AuthRoutes = lazy(() => import('./pages/Auth'));

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Suspense 
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" tip="Loading..." />
              </div>
            }
          >
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="/login" element={<Navigate to="/auth/login" replace />} />
              
              {/* Protected Routes - All app routes through MainLayout */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              />
              
              {/* Root redirect to login */}
              <Route path="/" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
