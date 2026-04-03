import apiClient from '../../../../utils/apiClient';
import type { AuditLog } from '../../../../store/slices/auditLogSlice';
import { store } from '../../../../utils/httpUtil';
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

export const auditLogService = {
  getAuditLogs: async (params: any) => {
    try {
      const response = await store('audit-log/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getAuditLogById: async (id: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/api/audit-logs/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
