import type { CreateContractPayload, UpdateContractPayload } from '../../../store/slices/contractSlice';
import { destroy, fetch, store, update } from '../../../utils/httpUtil';

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  throw new Error(err);
};

export const ContractService = {

  getContracts: async (params: any) => {
    try {
      const response = await store('contracts/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getContractById: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`contracts/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createContract: async (userData: CreateContractPayload): Promise<any> => {
    try {
      const response = await store('contracts/add', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateContract: async (values: UpdateContractPayload, id: string): Promise<any> => {
    try {
      const response = await update(`contracts/${id}`, values);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteContract: async (id: string): Promise<void> => {
    try {
      await destroy(`contracts/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

};
