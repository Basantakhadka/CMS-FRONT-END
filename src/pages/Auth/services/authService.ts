import apiClient from '../../../utils/apiClient';

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

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await apiClient.post('/api/auth/login', credentials);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/api/auth/logout');
    },

    refreshToken: async (): Promise<{ token: string }> => {
        const response = await apiClient.post('/api/auth/refresh');
        return response.data;
    },

    forgotPassword: async (email: string): Promise<void> => {
        await apiClient.post('/api/auth/forgot-password', { email });
    },

    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        await apiClient.post('/api/auth/reset-password', { token, newPassword });
    },
};
