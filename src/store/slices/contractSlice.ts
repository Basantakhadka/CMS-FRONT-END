import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ContractService } from '../../pages/Contracts_management_and _creation/services/ContractService';
export interface CreateContractPayload {
  title: string;               // Contract title
  type: string;                // Contract type
  parties: string[];           // Array of parties involved
  expiryDate: string;  
  contractDate: string;        // ISO string
  documentLink: string;  
    scopeOfWork?:string,
    amendmentDate?:string,
    amendmentLink?:string,
    terminationNoticeDays?:any,      // Document URL
  contractValue?: number;      // Optional contract value
  jurisdiction?: string;       // Optional
  renewalTerms?: string;       // Optional
  governingLaw: string;        // Governing law
}

// Payload for updating an existing contract
export interface UpdateContractPayload {
  id: string;                  // Contract ID
  title?: string;              // Optional, update only if provided
  type?: string;
  parties?: string[];
  expiryDate?: string;
    scopeOfWork?:string,
    amendmentDate?:string,
    amendmentLink?:string,
    terminationNoticeDays?:any,
  contractDate?: string;      // Optional, update only if provided
  documentLink?: string;
  contractValue?: number;
  jurisdiction?: string;
  renewalTerms?: string;
  governingLaw?: string;
}


export interface UsersState {
    contracts: any;
    individualContract: any;
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
    contracts: [],
    individualContract: null,
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
export const fetchContracts = createAsyncThunk(
    'contracts/fetchContracts',
    async (params: any) => {
        console.log({ params })
        const response = await ContractService.getContracts(params);
        return response;
    }
);

export const fetchContractById = createAsyncThunk(
    'contracts/fetchContractById',
    async (id: string) => {
        const response = await ContractService.getContractById(id);
        return response;
    }
);

export const createContract = createAsyncThunk(
    'contracts/createContract',
    async (contractData: CreateContractPayload) => {
        const response = await ContractService.createContract(contractData);
        return response;
    }
);

export const updateContract = createAsyncThunk(
    'contracts/updateContract',
    async ({ values, id }: { values: any; id: any }) => {
        const response = await ContractService.updateContract(values,id);
        return response;
    }
);

export const deleteContract = createAsyncThunk(
    'contracts/deleteContract',
    async (id: string) => {
        await ContractService.deleteContract(id);
        return id;
    }
);


const contractsSlice = createSlice({
    name: 'contracts',
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
        // Fetch Contracts
        builder
            .addCase(fetchContracts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContracts.fulfilled, (state, action) => {
                state.loading = false;
                state.contracts = action.payload.data;
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
                };
            })
            .addCase(fetchContracts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch contracts';
            })

            .addCase(fetchContractById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContractById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.individualContract = action.payload?.data;
            })
            .addCase(fetchContractById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch contract';
            })
            // Create Contract
            .addCase(createContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContract.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createContract.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create contract';
            })
            // Update Contract
            .addCase(updateContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContract.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.contracts = state?.contracts?.list?.map((contract: any) =>
                    contract.id === action.payload.id
                        ? action.payload
                        : contract
                );
            })
            .addCase(updateContract.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update contract';
            })

            // // Delete Contract
            .addCase(deleteContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContract.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.contracts = state?.contracts?.list?.filter((contract: any) => contract.id !== action.payload);
            })
            .addCase(deleteContract.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete contract';
            })
        
    },
});

export const { clearError, setPagination } = contractsSlice.actions;
export default contractsSlice.reducer;