import type { CreateContractAlertPayload } from '../../../store/slices/contractAlertSlice';
import { destroy, fetch, store, update } from '../../../utils/httpUtil';

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  throw new Error(err);
};

export const ContractAlertService = {

  getAlerts: async (params: any) => {
    try {
      const response = await store('alerts/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getAlertById: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`alerts/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createAlert: async (userData: CreateContractAlertPayload): Promise<any> => {
    try {
      const response = await store('alerts/add', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateAlert: async (values: any, id: string): Promise<any> => {
    try {
      const response = await update(`alerts/${id}`, values);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteAlert: async (id: string): Promise<void> => {
    try {
      await destroy(`alerts/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  getContracts: async (): Promise<any> => {
    try {
      const response = await fetch('contracts/dropdown/list');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

};
