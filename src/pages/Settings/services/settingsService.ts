import apiClient from '../../../utils/apiClient';

export const settingsService = {
    getSettings: async () => {
        const response = await apiClient.get('/api/settings');
        return response.data;
    },

    updateGeneralSettings: async (settings: any) => {
        const response = await apiClient.put('/api/settings/general', settings);
        return response.data;
    },

    updateAccountSettings: async (settings: any) => {
        const response = await apiClient.put('/api/settings/account', settings);
        return response.data;
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        const response = await apiClient.post('/api/settings/change-password', {
            currentPassword,
            newPassword,
        });
        return response.data;
    },
};
