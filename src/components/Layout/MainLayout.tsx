import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Spin } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  SafetyOutlined,
  TeamOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MainLayout.css';

// Lazy load module routes
const DashboardRoutes = lazy(() => import('../../pages/Dashboard'));
const IdentityAccessRoutes = lazy(() => import('../../pages/IdentityAccess'));
const SettingsRoutes = lazy(() => import('../../pages/Settings'));
const AlertsRoutes = lazy(() => import('../../pages/Alerts'));


const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'identity-access',
      icon: <SecurityScanOutlined />,
      label: 'Identity & Access',
      children: [
        {
          key: '/iam/general',
          icon: <SafetyOutlined />,
          label: 'General',
        },
        {
          key: '/iam/users',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
          key: '/iam/roles',
          icon: <TeamOutlined />,
          label: 'Roles',
        },
      ],
    },


    {
      key: '/alerts',
      icon: <AlertOutlined />,
      label: 'Alerts',
    },

    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    }

  ];

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        width={280}
        className={`layout-sider ${isMobile && !collapsed ? 'mobile-sider-open' : ''}`}
        style={{
          overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: isMobile ? 999 : 100,
          background: 'linear-gradient(180deg, #1a1f3a 0%, #2d3561 50%, #1a1f3a 100%)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <div
            style={{
              height: 70,
              margin: '20px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
          >
            {collapsed ? 'CMS' : 'CMS System'}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </div>
          {/* Sidebar Footer */}
          <div
            style={{
              padding: collapsed ? '12px 8px' : '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.2)',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '12px',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            {!collapsed && (
              <>
                <div style={{ fontWeight: 600, marginBottom: '4px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  CMS v1.0.0
                </div>
                <div>© 2026 All rights reserved</div>
              </>
            )}
            {collapsed && <div style={{ fontSize: '10px' }}>v1.0</div>}
          </div>
        </div>
      </Sider>
      
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 280), transition: 'margin-left 0.2s' }}>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: isMobile ? 0 : (collapsed ? 80 : 280),
            zIndex: 99,
            transition: 'left 0.2s',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <span style={{ display: isMobile ? 'none' : 'inline' }}>{user?.username}</span>
            </div>
          </Dropdown>
        </Header>
        <Content
          className="layout-content"
          style={{
            margin: '88px 16px 24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense 
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Loading..." />
              </div>
            }
          >
            <Routes>
              <Route path="/dashboard/*" element={<DashboardRoutes />} />
              <Route path="/iam/*" element={<IdentityAccessRoutes />} />
              <Route path="/settings/*" element={<SettingsRoutes />} />
              <Route path="/alerts/*" element={<AlertsRoutes />} />
              <Route path="/" element={<DashboardRoutes />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
