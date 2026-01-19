import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css';
import logo from '../../../assets/login1.webp';

const { Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  return (
    <div className="login-page-container">
      {/* LEFT SECTION - Fixed Position */}
      <div className="side-visual">
        <div className="visual-overlay" />
        <div className="visual-content">
          <h1 className="brand-title">ClauseHQ</h1>
          <p className="brand-subtitle">
            Advanced Contract Management for Nepal's Legal Professionals.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - Scrollable/Flex Column */}
      <div className="side-form">
        <div className="form-content-inner">
          <div className="logo-area">
            {/* Replace with your actual logo path */}
            {/* <img 
              src={logo} 
              alt="Logo" 
              className="main-logo" 
            /> */}
            <h1>ClauseHQ</h1>
          </div>

          <div className="actual-form-wrapper">
            <Form
              name="login"
              onFinish={onSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>

              <div className="forgot-container">
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="login-btn"
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="login-footer">
          <Text type="secondary">
            © {new Date().getFullYear()} ClauseHQ.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;