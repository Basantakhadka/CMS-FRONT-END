import apiClient from '../../../../utils/apiClient';
import type { User, CreateUserPayload, UpdateUserPayload } from '../../../../store/slices/usersSlice';

export const usersService = {
    getUsers: async (params: { page?: number; pageSize?: number; search?: string } = {}) => {
        const response = await apiClient.get('/api/iam/users', { params });
        return response.data;
    },

    getUserById: async (id: string): Promise<User> => {
        const response = await apiClient.get(`/api/iam/users/${ id }`);
        return response.data;
    },

    createUser: async (userData: CreateUserPayload): Promise<User> => {
        const response = await apiClient.post('/api/iam/users', userData);
        return response.data;
    },

    updateUser: async (userData: UpdateUserPayload): Promise<User> => {
        const { id, ...data } = userData;
        const response = await apiClient.put(`/api/iam/users/${ id }`, data);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/iam/users/${ id }`);
    },

    assignRoles: async (userId: string, roleIds: string[]): Promise<User> => {
        const response = await apiClient.post(`/api/iam/users/${ userId }/roles`, { roleIds });
        return response.data;
    },
};
