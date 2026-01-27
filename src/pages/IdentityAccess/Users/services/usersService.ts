import apiClient from '../../../../utils/apiClient';
import type { User, CreateUserPayload, UpdateUserPayload } from '../../../../store/slices/usersSlice';
import { destroy, store, update } from '../../../../utils/httpUtil';

export const usersService = {
    getUsers: async (params: any) => {
        const response = await store('identity-access/users/list', params);
        return response.data;
    },

    getUserById: async (id: string): Promise<User> => {
        const response = await apiClient.get(`/api/iam/users/${ id }`);
        return response.data;
    },

    createUser: async (userData: CreateUserPayload): Promise<User> => {
        const response = await store('identity-access/users', userData);
        return response.data;
    },

    updateUser: async (userData: UpdateUserPayload): Promise<User> => {
        const { id, ...data } = userData;
        const response = await update(`identity-access/users/${ userData?.id }`, data);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await destroy(`identity-access/users/${ id }`);
    },

    getRoleDropdown: async (): Promise<any> => {
        const response = await store(`identity-access/roles-select-menu`, {});
        return response.data;
    },
};
