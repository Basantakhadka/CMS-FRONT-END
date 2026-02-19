import { message } from 'antd';
import type {  CreateRolePayload } from '../../../../store/slices/rolesSlice';
import { store, fetch, update, destroy } from '../../../../utils/httpUtil';

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  message.error(err);
  throw new Error(err);
};

export const rolesService = {
  getRoles: async (params: any) => {
    try {
      const response = await store('identity-access/roles/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getRoleById: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`identity-access/roles/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getPermissions: async (): Promise<any> => {
    try {
      const response = await fetch('identity-access/roles-permissionsui');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createRole: async (roleData: CreateRolePayload): Promise<any> => {
    try {
      const response = await store('identity-access/roles', roleData);
   
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateRole: async (roleData: any, id: string): Promise<any> => {
    try {
      const response = await update(`identity-access/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteRole: async (id: string): Promise<void> => {
    try {
      await destroy(`identity-access/roles/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
