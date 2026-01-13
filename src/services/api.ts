import apiClient from '../utils/apiClient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

// User APIs
export const userApi = {
    // Get all users
    getAllUsers: async () => {
        const response = await apiClient.get<User[]>('/users');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id: string) => {
        const response = await apiClient.get<User>(`/users/${ id }`);
        return response.data;
    },

    // Create new user
    createUser: async (userData: Omit<User, 'id'>) => {
        const response = await apiClient.post<User>('/users', userData);
        return response.data;
    },

    // Update user
    updateUser: async (id: string, userData: Partial<User>) => {
        const response = await apiClient.put<User>(`/users/${ id }`, userData);
        return response.data;
    },

    // Delete user
    deleteUser: async (id: string) => {
        const response = await apiClient.delete(`/users/${ id }`);
        return response.data;
    },
};

// Auth APIs
export const authApi = {
    // Login
    login: async (credentials: LoginCredentials) => {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    },
};

// Generic API helpers
export const apiHelpers = {
    // GET request
    get: async <T>(endpoint: string) => {
        const response = await apiClient.get<T>(endpoint);
        return response.data;
    },

    // POST request
    post: async <T>(endpoint: string, data: any) => {
        const response = await apiClient.post<T>(endpoint, data);
        return response.data;
    },

    // PUT request
    put: async <T>(endpoint: string, data: any) => {
        const response = await apiClient.put<T>(endpoint, data);
        return response.data;
    },

    // DELETE request
    delete: async <T>(endpoint: string) => {
        const response = await apiClient.delete<T>(endpoint);
        return response.data;
    },

    // PATCH request
    patch: async <T>(endpoint: string, data: any) => {
        const response = await apiClient.patch<T>(endpoint, data);
        return response.data;
    },
};
