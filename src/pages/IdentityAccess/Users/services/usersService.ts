import apiClient from '../../../../utils/apiClient';
import type { User, CreateUserPayload, UpdateUserPayload } from '../../../../store/slices/usersSlice';
import { destroy, store, update } from '../../../../utils/httpUtil';
import { message } from 'antd';


const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  message.error(err);
  throw new Error(err);
};

export const usersService = {
  getUsers: async (params: any) => {
    try {
      const response = await store('identity-access/users/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserById: async (id: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/api/iam/users/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createUser: async (userData: CreateUserPayload): Promise<any> => {
    try {
      const response = await store('identity-access/users', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateUser: async (userData: UpdateUserPayload): Promise<any> => {
    try {
      const { id, ...data } = userData;
      const response = await update(`identity-access/users/${id}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteUser: async (id: string): Promise<any> => {
    try {
      const response = await destroy(`identity-access/users/${id}`);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },

  getRoleDropdown: async (): Promise<any> => {
    try {
      const response = await store(`identity-access/roles-select-menu`, {});
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
