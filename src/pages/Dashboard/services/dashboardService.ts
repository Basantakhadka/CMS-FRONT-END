import apiClient from '../../../utils/apiClient';

export const dashboardService = {
    getStats: async () => {
        const response = await apiClient.get('/api/dashboard/stats');
        return response.data;
    },

    getRecentActivity: async () => {
        const response = await apiClient.get('/api/dashboard/activity');
        return response.data;
    },

    getChartData: async (type: string) => {
        const response = await apiClient.get(`/api/dashboard/charts/${ type }`);
        return response.data;
    },
};
