import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { generalService } from '../../pages/IdentityAccess/General/services/generalService';

export interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expiryDays: number;
    preventReuse: number;
}

export interface MFASettings {
    enabled: boolean;
    methods: ('sms' | 'email' | 'authenticator')[];
    mandatory: boolean;
}

export interface OTPSettings {
    enabled: boolean;
    expiryMinutes: number;
    maxAttempts: number;
    smsEnabled: boolean;
    emailEnabled: boolean;
    merchantOTPEnabled: boolean;
}

export interface GeneralState {
    passwordPolicy: PasswordPolicy | null;
    mfaSettings: MFASettings | null;
    otpSettings: OTPSettings | null;
    loading: boolean;
    error: string | null;
}

const initialState: GeneralState = {
    passwordPolicy: null,
    mfaSettings: null,
    otpSettings: null,
    loading: false,
    error: null,
};

// Async Thunks
export const fetchPasswordPolicy = createAsyncThunk(
    'general/fetchPasswordPolicy',
    async () => {
        const response = await generalService.getPasswordPolicy();
        return response;
    }
);

export const updatePasswordPolicy = createAsyncThunk(
    'general/updatePasswordPolicy',
    async (policy: PasswordPolicy) => {
        const response = await generalService.updatePasswordPolicy(policy);
        return response;
    }
);

export const fetchMFASettings = createAsyncThunk(
    'general/fetchMFASettings',
    async () => {
        const response = await generalService.getMFASettings();
        return response;
    }
);

export const updateMFASettings = createAsyncThunk(
    'general/updateMFASettings',
    async (settings: MFASettings) => {
        const response = await generalService.updateMFASettings(settings);
        return response;
    }
);

export const fetchOTPSettings = createAsyncThunk(
    'general/fetchOTPSettings',
    async () => {
        const response = await generalService.getOTPSettings();
        return response;
    }
);

export const updateOTPSettings = createAsyncThunk(
    'general/updateOTPSettings',
    async (settings: OTPSettings) => {
        const response = await generalService.updateOTPSettings(settings);
        return response;
    }
);

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Password Policy
        builder
            .addCase(fetchPasswordPolicy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPasswordPolicy.fulfilled, (state, action: PayloadAction<PasswordPolicy>) => {
                state.loading = false;
                state.passwordPolicy = action.payload;
            })
            .addCase(fetchPasswordPolicy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch password policy';
            })
            .addCase(updatePasswordPolicy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePasswordPolicy.fulfilled, (state, action: PayloadAction<PasswordPolicy>) => {
                state.loading = false;
                state.passwordPolicy = action.payload;
            })
            .addCase(updatePasswordPolicy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update password policy';
            })
            // MFA Settings
            .addCase(fetchMFASettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMFASettings.fulfilled, (state, action: PayloadAction<MFASettings>) => {
                state.loading = false;
                state.mfaSettings = action.payload;
            })
            .addCase(fetchMFASettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch MFA settings';
            })
            .addCase(updateMFASettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMFASettings.fulfilled, (state, action: PayloadAction<MFASettings>) => {
                state.loading = false;
                state.mfaSettings = action.payload;
            })
            .addCase(updateMFASettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update MFA settings';
            })
            // OTP Settings
            .addCase(fetchOTPSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOTPSettings.fulfilled, (state, action: PayloadAction<OTPSettings>) => {
                state.loading = false;
                state.otpSettings = action.payload;
            })
            .addCase(fetchOTPSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch OTP settings';
            })
            .addCase(updateOTPSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOTPSettings.fulfilled, (state, action: PayloadAction<OTPSettings>) => {
                state.loading = false;
                state.otpSettings = action.payload;
            })
            .addCase(updateOTPSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update OTP settings';
            });
    },
});

export const { clearError } = generalSlice.actions;
export default generalSlice.reducer;
