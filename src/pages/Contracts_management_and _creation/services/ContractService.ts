
import type { CreateContractPayload, UpdateContractPayload } from '../../../store/slices/contractSlice';
import { destroy, fetch, store, update } from '../../../utils/httpUtil';

export const ContractService = {
    getContracts: async (params: any) => {
        const response = await store('contracts/list', params);
        return response.data;
    },

    getContractById: async (id: string): Promise<any> => {
        const response = await fetch(`contracts/${ id }`);
        return response.data;
    },

    createContract: async (userData: CreateContractPayload): Promise<any> => {
        const response = await store('contracts/add', userData);
        return response.data;
    },

    updateContract: async (values: any, id: any): Promise<any> => {
        const response = await update(`contracts/${ id }`, values);
        return response.data;
    },

    deleteContract: async (id: string): Promise<void> => {
        await destroy(`contracts/${ id }`);
    },

};
