import React, { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import LoginForm from '../components/LoginForm';
import '../Auth.css';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await login(values);
      console.log({ response })
      if (response?.data?.loginInfo?.accessToken) {
        setLoading(false)
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} />;
};

export default LoginContainer;
