
import type { CreateContractAlertPayload } from '../../../store/slices/contractAlertSlice';
import { destroy, fetch, store, update } from '../../../utils/httpUtil';

export const ContractAlertService = {
    getAlerts: async (params: any) => {
        const response = await store('alerts/list', params);
        return response.data;
    },

    getAlertById: async (id: string): Promise<any> => {
        const response = await fetch(`alerts/${id}`);
        return response.data;
    },

    createAlert: async (userData: CreateContractAlertPayload): Promise<any> => {
        const response = await store('alerts/add', userData);
        return response.data;
    },

    updateAlert: async (values: any, id: any): Promise<any> => {
        const response = await update(`alerts/${id}`, values);
        return response.data;
    },

    deleteAlert: async (id: string): Promise<void> => {
        await destroy(`alerts/${id}`);
    },
    getContracts: async (): Promise<any> => {
        const response = await fetch('contracts/dropdown/list');
        return response.data;
    },

};
