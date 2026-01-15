import apiClient from '../../../../utils/apiClient';
import type { PasswordPolicy, MFASettings, OTPSettings } from '../../../../store/slices/generalSlice';

export const generalService = {
    // Password Policy
    getPasswordPolicy: async (): Promise<PasswordPolicy> => {
        const response = await apiClient.get('/api/iam/general/password-policy');
        return response.data;
    },

    updatePasswordPolicy: async (policy: PasswordPolicy): Promise<PasswordPolicy> => {
        const response = await apiClient.put('/api/iam/general/password-policy', policy);
        return response.data;
    },

    // MFA Settings
    getMFASettings: async (): Promise<MFASettings> => {
        const response = await apiClient.get('/api/iam/general/mfa-settings');
        return response.data;
    },

    updateMFASettings: async (settings: MFASettings): Promise<MFASettings> => {
        const response = await apiClient.put('/api/iam/general/mfa-settings', settings);
        return response.data;
    },

    // OTP Settings
    getOTPSettings: async (): Promise<OTPSettings> => {
        const response = await apiClient.get('/api/iam/general/otp-settings');
        return response.data;
    },

    updateOTPSettings: async (settings: OTPSettings): Promise<OTPSettings> => {
        const response = await apiClient.put('/api/iam/general/otp-settings', settings);
        return response.data;
    },
};
