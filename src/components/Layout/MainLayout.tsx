import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Spin, Typography, Modal, Form, Input, message } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  SafetyOutlined,
  TeamOutlined,
  AlertOutlined,
  FileTextOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MainLayout.css';
import { DASHBOARD, CONTRACTS, IAM_GENERAL_PASSWORDPOLICY, IAM_USERS_LIST, ALERTS, ALERTS_LIST, IAM_AUDIT_LOGS_LIST } from '../../constants/PermissionConfig';
import { PERMISSION_KEY, CLIENT_CODE, CLIENT_NAME } from '../../constants';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtils';
import { store } from '../../utils/httpUtil';
import AuthRoute from './AuthRoute';

const readLocalStorageValue = (key: string) => {
  try {
    return getLocalStorage(key);
  } catch (error) {
    return null;
  }
};

// Lazy load module routes
const DashboardRoutes = lazy(() => import('../../pages/Dashboard'));
const IdentityAccessRoutes = lazy(() => import('../../pages/IdentityAccess'));
const SettingsRoutes = lazy(() => import('../../pages/Settings'));
const AlertsRoutes = lazy(() => import('../../pages/Alerts'));
const ContractsView = lazy(() => import('../../pages/Contracts_management_and _creation'));

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientCode, setClientCode] = useState<string>(() => readLocalStorageValue(CLIENT_CODE) || '');
  const [clientName, setClientName] = useState<string>(() => readLocalStorageValue(CLIENT_NAME) || '');
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [savingClient, setSavingClient] = useState(false);
  const [clientForm] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const permissions: string[] = getLocalStorage(PERMISSION_KEY) || [];

  const hasPermission = (key: string) => {
    return permissions?.some((perm: string) => perm === key || perm.startsWith(key + ':'));
  };

  const showAddClientButton = !clientCode || clientCode === '000';

  const openClientModal = () => {
    clientForm.setFieldsValue({
      clientCode: clientCode === '000' ? '' : clientCode,
      clientName: clientName || '',
    });
    setIsClientModalVisible(true);
  };

  const handleClientModalClose = () => {
    setIsClientModalVisible(false);
    clientForm.resetFields();
  };

  const handleClientSubmit = async (values: { clientCode: string; clientName: string }) => {
    setSavingClient(true);
    try {
      await store('identity-access/clients', values);
      message.success('Client details saved successfully');
      handleClientModalClose();
    } catch (error) {
      const errMsg = 
        (error as any)?.response?.data?.message ||
        (error as any)?.message ||
        'Failed to save client details';
      message.error(errMsg);
    } finally {
      setSavingClient(false);
    }
  };

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sidebar menu items
  const menuItems: any[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      rights: [DASHBOARD],
    },
    {
      key: '/contracts',
      icon: <FileTextOutlined />,
      label: 'Contracts',
      rights: [CONTRACTS],
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
          rights: [IAM_GENERAL_PASSWORDPOLICY],
        },
        {
          key: '/iam/users',
          icon: <UserOutlined />,
          label: 'Users',
          rights: [IAM_USERS_LIST],
        },
        {
          key: '/iam/roles',
          icon: <TeamOutlined />,
          label: 'Roles',
          rights: [IAM_USERS_LIST],
        },
        {
          key: '/iam/audit-logs',
          icon: <AuditOutlined />,
          label: 'User Audit Logs',
          rights: [IAM_USERS_LIST],
        },
      ],
    },
    {
      key: '/alerts',
      icon: <AlertOutlined />,
      label: 'Alerts',
      rights: [ALERTS, ALERTS_LIST],
    },
  ];

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child:any) =>
          child.rights?.some((right: string) => hasPermission(right))
        );
        if (filteredChildren.length > 0) return { ...item, children: filteredChildren };
        return null;
      } else {
        return item.rights?.some((right: string) => hasPermission(right)) ? item : null;
      }
    })
    .filter(Boolean);

  // Handle sidebar navigation
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    if (isMobile) setCollapsed(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout },
  ];

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
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: isMobile ? 999 : 100,
          background: '#000',
          boxShadow: '1px 0 0 0 rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: 60,
              margin: '24px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: collapsed ? 'transparent' : 'white',
            }}
          >
            {collapsed ? (
              <img src="/unnamed.jpg" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            ) : (
              <Typography.Text strong style={{ fontSize: '26px', color: 'black' }}>
                ClauseHQ
              </Typography.Text>
            )}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={filteredMenuItems}
              onClick={handleMenuClick}
            />
          </div>
          <div
            style={{
              padding: collapsed ? '12px 8px' : '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.2)',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '12px',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            {!collapsed && (
              <>
                <div style={{ fontWeight: 600, marginBottom: '4px', color: 'rgba(255,255,255,0.85)' }}>
                  ClauseHQ v1.0.0
                </div>
                <div>© 2026 All rights reserved</div>
              </>
            )}
            {collapsed && <div style={{ fontSize: '10px' }}>v1.0</div>}
          </div>
        </div>
      </Sider>

      {isMobile && !collapsed && <div className="sidebar-overlay" onClick={() => setCollapsed(true)} />}

      <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 280, transition: 'margin-left 0.2s' }}>
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
            left: isMobile ? 0 : collapsed ? 80 : 280,
            zIndex: 99,
            transition: 'left 0.2s',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div className="header-actions">
            {showAddClientButton && (
              <Button
                type="primary"
                onClick={openClientModal}
                className="add-client-btn"
                size="middle"
              >
                Add Client
              </Button>
            )}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <span style={{ display: isMobile ? 'none' : 'inline' }}>{user?.username}</span>
              </div>
            </Dropdown>
          </div>
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
              <Route
                path="/dashboard/*"
                element={<AuthRoute isAuthorized={hasPermission('dashboard')} element={<DashboardRoutes />} />}
              />
              <Route
                path="/contracts/*"
                element={<AuthRoute isAuthorized={hasPermission('contracts')} element={<ContractsView />} />}
              />
              <Route
                path="/iam/*"
                element={<AuthRoute isAuthorized={hasPermission('iam')} element={<IdentityAccessRoutes />} />}
              />
              <Route
                path="/settings/*"
                element={<AuthRoute isAuthorized={hasPermission('settings')} element={<SettingsRoutes />} />}
              />
              <Route
                path="/alerts/*"
                element={<AuthRoute isAuthorized={hasPermission('alerts')} element={<AlertsRoutes />} />}
              />
              <Route path="/" element={<AuthRoute isAuthorized={true} element={<DashboardRoutes />} />} />
            </Routes>
          </Suspense>
        </Content>
        <Modal
          title="Add Client"
          open={isClientModalVisible}
          onCancel={handleClientModalClose}
          footer={null}
          destroyOnClose
        >
          <Form layout="vertical" form={clientForm} onFinish={handleClientSubmit}>
            <Form.Item
              label="Client Code"
              name="clientCode"
              rules={[{ required: true, message: 'Please enter client code' }]}
            >
              <Input placeholder="Enter client code" />
            </Form.Item>
            <Form.Item
              label="Client Name"
              name="clientName"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input placeholder="Enter client name" />
            </Form.Item>
            <div className="modal-actions">
              <Button onClick={handleClientModalClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={savingClient}>
                Save Client
              </Button>
            </div>
          </Form>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default MainLayout;