import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import LoginForm from '../components/LoginForm';
import '../Auth.css';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation for demo (username: admin, password: admin123)
      if (values.username === 'admin' && values.password === 'admin123') {
        login({
          id: '1',
          username: values.username,
          email: 'admin@example.com',
          token: 'demo-token-123',
        });
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} />;
};

export default LoginContainer;
