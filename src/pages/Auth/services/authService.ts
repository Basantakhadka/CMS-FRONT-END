import apiClient from '../../../utils/apiClient';
import { store } from '../../../utils/httpUtil';
import type ChangePassword from '../components/ChangePassword';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: string;
  username: string;
  email: string;
  token: string;
}

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  throw new Error(err);
};

export const authService = {

  login: async (credentials: LoginCredentials): Promise<any> => {
    try {
      const response = await store('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  changePassword: async (credentials: any): Promise<any> => {
    try {
      const response = await store('auth/change-password', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      handleApiError(error);
    }
  },

//   refreshToken: async (): Promise<{ token: string }> => {
//     try {
//       const response = await apiClient.post('/api/auth/refresh');
//       return response.data;
//     } catch (error) {
//       handleApiError(error);
//     }
//   },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      await apiClient.post('/api/auth/forgot-password', { email });
    } catch (error) {
      handleApiError(error);
    }
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await apiClient.post('/api/auth/reset-password', { token, newPassword });
    } catch (error) {
      handleApiError(error);
    }
  },
};
