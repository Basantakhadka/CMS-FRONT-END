import apiClient from '../../../utils/apiClient';

export const alertsService = {
    getAlerts: async () => {
        const response = await apiClient.get('/api/alerts');
        return response.data;
    },

};
