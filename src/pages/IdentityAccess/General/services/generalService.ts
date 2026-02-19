import apiClient from '../../../../utils/apiClient';
import type { PasswordPolicy, MFASettings, OTPSettings } from '../../../../store/slices/generalSlice';
import { store, fetch, update } from '../../../../utils/httpUtil';

const handleApiError = (error: any): never => {
  const err =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  throw new Error(err);
};

export const generalService = {

  // Password Policy
  getPasswordPolicy: async (): Promise<any> => {
    try {
      const response = await fetch('identity-access/general-policy');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  addPasswordPolicy: async (policy: PasswordPolicy): Promise<any> => {
    try {
      const response = await store('identity-access/general-policy', policy);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updatePasswordPolicy: async (policy: PasswordPolicy): Promise<any> => {
    try {
      const response = await store('identity-access/general-policy', { passwordPolicy: policy });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // MFA Settings
  getMFASettings: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/api/iam/general/mfa-settings');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateMFASettings: async (settings: MFASettings): Promise<any> => {
    try {
      const response = await apiClient.put('/api/iam/general/mfa-settings', settings);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // OTP Settings
  getOTPSettings: async (): Promise<any> => {
    try {
      const response = await apiClient.get('/api/iam/general/otp-settings');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateOTPSettings: async (settings: OTPSettings): Promise<any> => {
    try {
      const response = await apiClient.put('/api/iam/general/otp-settings', settings);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
