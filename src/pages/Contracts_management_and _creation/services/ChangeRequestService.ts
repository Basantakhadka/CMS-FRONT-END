import { destroy, fetch, store, update } from '../../../utils/httpUtil';

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong';

  throw new Error(err);
};

export const ChangeRequestService = {
  getChangeRequests: async (params: any) => {
    try {
      const response = await store('contracts/change-requests/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getChangeRequestById: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`contracts/change-requests/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteChangeRequest: async (id: string): Promise<void> => {
    try {
      await destroy(`contracts/change-requests/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  approveChangeRequest: async (id: string): Promise<any> => {
    try {
      const response = await store(`contracts/change-requests/${id}/approve`, {});
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  rejectChangeRequest: async (id: string, payload?: { remarks?: string }): Promise<any> => {
    try {
      const response = await store(`contracts/change-requests/${id}/reject`, payload || {});
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
