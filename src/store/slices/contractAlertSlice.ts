import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ContractAlertService } from '../../pages/Alerts/services/AlertsServices';
export interface CreateContractAlertPayload {
  contractId: string;                 // Related Contract ID
  triggerExpiry?: boolean;            // Enable expiry-based alert
  enableCustom?: boolean;             // Enable custom reminders
  reminderInterval?: number;          // Reminder interval in days
  communicationChannels?: string[];   // e.g. ["email", "sms"]
  stakeholders?: string[];            // Stakeholder IDs / emails
}

// Payload for updating an existing contract alert
export interface UpdateContractAlertPayload {
  id: string;                  // Contract ID
  contractId?: string;              // Optional, update only if provided
  triggerExpiry?: boolean;
  enableCustom?: boolean;
  reminderInterval?: number;
  communicationChannels?: string[];
  stakeholders?: string[];
}


export interface UsersState {
    alerts: any;
    individualAlert: any;
    contracts: any;
    loading: boolean;
    error: string | null;
    data: {
        data: any;
        loading: boolean;
        error: string | null;
    };
    pageInfo: {
        current: number;
        size: number;
        sortMeta: string;
    };
}

const initialState: UsersState = {
    alerts: [],
    individualAlert: null,
    contracts: [],
    loading: false,
    error: null,
    data: {
        data: [],
        loading: false,
        error: null,
    },
    pageInfo: {
        current: 1,
        size: 10,
        sortMeta: ''
    },
};

// Async Thunks
export const fetchAlerts = createAsyncThunk(
    'alerts/fetchAlerts',
    async (params: any) => {
        console.log({ params })
        const response = await ContractAlertService.getAlerts(params);
        return response;
    }
);

export const fetchAlertById = createAsyncThunk(
    'alerts/fetchAlertById',
    async (id: string) => {
        const response = await ContractAlertService.getAlertById(id);
        return response;
    }
);

export const createAlert = createAsyncThunk(
    'alerts/createAlert',
    async (alertData: CreateContractAlertPayload) => {
        const response = await ContractAlertService.createAlert(alertData);
        return response;
    }
);

export const updateAlert = createAsyncThunk(
    'alerts/updateAlert',
    async ({ values, id }: { values: any; id: any }) => {
        const response = await ContractAlertService.updateAlert(values,id);
        return response;
    }
);

export const deleteAlert = createAsyncThunk(
    'alerts/deleteAlert',
    async (id: string) => {
        await ContractAlertService.deleteAlert(id);
        return id;
    }
);
export const fetchContractsForAlerts = createAsyncThunk(
    'alerts/fetchContractsForAlerts',
    async () => {
        const response = await ContractAlertService.getContracts();
        return response;
    }
);


const contractAlertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        setPagination: (state, action: PayloadAction<{ page: number; pageSize: number }>) => {
            state.pageInfo = { ...state.pageInfo, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Fetch Alerts
        builder
            .addCase(fetchAlerts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlerts.fulfilled, (state, action) => {
                state.loading = false;
                state.alerts = action.payload.data;
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
                };
            })
            .addCase(fetchAlerts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch alerts';
            })

            .addCase(fetchAlertById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlertById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.individualAlert = action.payload?.data;
            })
            .addCase(fetchAlertById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch contract';
            })
            // Create Alert
            .addCase(createAlert.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAlert.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAlert.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create alert';
            })
            // Update Alert
            .addCase(updateAlert.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAlert.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.alerts = state?.alerts?.list?.map((alert: any) =>
                    alert.id === action.payload.id
                        ? action.payload
                        : alert
                );
            })
            .addCase(updateAlert.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update alert';
            })

            // // Delete Alert
            .addCase(deleteAlert.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAlert.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.alerts = state?.alerts?.list?.filter((alert: any) => alert.id !== action.payload);
            })
            .addCase(deleteAlert.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete alert';
            })

            // Fetch Contracts for Alerts
            .addCase(fetchContractsForAlerts.pending, (state) => {
                state.data.loading = true;
                state.data.error = null;
            })
            .addCase(fetchContractsForAlerts.fulfilled, (state, action: PayloadAction<any>) => {
                state.data.loading = false;
                state.contracts = action.payload?.data;
            })
            .addCase(fetchContractsForAlerts.rejected, (state, action) => {
                state.data.loading = false;
                state.data.error = action.error.message || 'Failed to fetch contracts for alerts';
            }); 
        
    },
});

export const { clearError, setPagination } = contractAlertSlice.actions;
export default contractAlertSlice.reducer;