import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ClientServices } from '../../pages/Client_Management/Services/ClientServices';



export interface ClientsState {
    clients: any;
    loading: boolean;
    error: any | null;
    pageInfo: {
        current: number;
        size: number;
        sortMeta: string;
    };
}

const initialState: ClientsState = {
    clients: [],
    loading: false,
    error: null,
    pageInfo: {
        current: 1,
        size: 10,
        sortMeta: ''
    },
};

// Async Thunks
export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    async (params: any) => {
        const response = await ClientServices.getClients(params);
        return response;
    }
);



const clientSlice = createSlice({
    name: 'clients',
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
        // Fetch Clients
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.data;
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
                };
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
           
    },
});

export const { clearError, setPagination } = clientSlice.actions;
export default clientSlice.reducer;
