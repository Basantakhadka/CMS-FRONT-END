

import { message } from 'antd';
import { store } from '../../../utils/httpUtil';


const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  message.error(err);
  throw new Error(err);
};

export const ClientServices = {
  getClients: async (params: any) => {
    try {
      const response = await store('clients/list', params);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

};
