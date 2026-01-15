import apiClient from '../../../../utils/apiClient';
import type { Role, Permission, CreateRolePayload, UpdateRolePayload } from '../../../../store/slices/rolesSlice';

export const rolesService = {
    getRoles: async (params: { page?: number; pageSize?: number; search?: string } = {}) => {
        const response = await apiClient.get('/api/iam/roles', { params });
        return response.data;
    },

    getRoleById: async (id: string): Promise<Role> => {
        const response = await apiClient.get(`/api/iam/roles/${ id }`);
        return response.data;
    },

    getPermissions: async (): Promise<Permission[]> => {
        const response = await apiClient.get('/api/iam/permissions');
        return response.data;
    },

    createRole: async (roleData: CreateRolePayload): Promise<Role> => {
        const response = await apiClient.post('/api/iam/roles', roleData);
        return response.data;
    },

    updateRole: async (roleData: UpdateRolePayload): Promise<Role> => {
        const { id, ...data } = roleData;
        const response = await apiClient.put(`/api/iam/roles/${ id }`, data);
        return response.data;
    },

    deleteRole: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/iam/roles/${ id }`);
    },

    assignRoleToUsers: async (roleId: string, userIds: string[]): Promise<Role> => {
        const response = await apiClient.post(`/api/iam/roles/${ roleId }/users`, { userIds });
        return response.data;
    },
};
