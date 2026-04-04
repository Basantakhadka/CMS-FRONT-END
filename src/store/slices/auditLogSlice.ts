import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { auditLogService } from '../../pages/IdentityAccess/AuditLog/services/auditLogService';

export interface AuditLogValue {
    userId?: string;
    userName?: string;
    employeeId?: string;
}

export interface AuditLog {
    id: string;
    actorUserId: string;
    actorUserName: string;
    resourceType: string;
    resourceId: string;
    resourceLabel: string;
    previousValue: AuditLogValue | null;
    newValue: AuditLogValue | null;
    errorMessage: string;
    performedAt: string;
    clientCode: string;
    action: string;
}

export interface AuditLogState {
    auditLogs: any;
    loading: boolean;
    error: any | null;
    pageInfo: {
        current: number;
        size: number;
        sortMeta: string;
    };
}

const initialState: AuditLogState = {
    auditLogs: [],
    loading: false,
    error: null,
    pageInfo: {
        current: 1,
        size: 10,
        sortMeta: ''
    },
};

// Async Thunks
export const fetchAuditLogs = createAsyncThunk(
    'auditLogs/fetchAuditLogs',
    async (params: any) => {
        const response = await auditLogService.getAuditLogs(params);
        return response;
    }
);

export const fetchAuditLogById = createAsyncThunk(
    'auditLogs/fetchAuditLogById',
    async (id: string) => {
        const response = await auditLogService.getAuditLogById(id);
        return response;
    }
);

const auditLogSlice = createSlice({
    name: 'auditLogs',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        setPagination: (state, action: PayloadAction<{ page: number; pageSize: number }>) => {
            state.pageInfo = { ...state.pageInfo, page: action.payload.page, size: action.payload.pageSize };
        },
    },
    extraReducers: (builder) => {
        // Fetch Audit Logs
        builder
            .addCase(fetchAuditLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.auditLogs = action.payload.data;
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
                };
            })
            .addCase(fetchAuditLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // Fetch Audit Log By ID
            .addCase(fetchAuditLogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditLogById.fulfilled, (state, action: PayloadAction<AuditLog>) => {
                state.loading = false;
            })
            .addCase(fetchAuditLogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch audit log';
            });
    },
});

export const { clearError, setPagination } = auditLogSlice.actions;
export default auditLogSlice.reducer;
