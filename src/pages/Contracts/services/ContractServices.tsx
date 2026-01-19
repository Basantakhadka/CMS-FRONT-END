import apiClient from '../../../utils/apiClient';

export const ContractServices = {
    getAlerts: async () => {
        const response = await apiClient.get('/api/alerts');
        return response.data;
    },

};
