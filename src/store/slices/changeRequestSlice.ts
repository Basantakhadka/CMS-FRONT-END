import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ChangeRequestService } from '../../pages/Contracts_management_and _creation/services/ChangeRequestService';

interface ChangeRequestState {
  changeRequests: any;
  individualChangeRequest: any;
  loading: boolean;
  error: string | null;
  pageInfo: {
    current: number;
    size: number;
    sortMeta: string;
  };
}

const initialState: ChangeRequestState = {
  changeRequests: [],
  individualChangeRequest: null,
  loading: false,
  error: null,
  pageInfo: {
    current: 1,
    size: 10,
    sortMeta: '',
  },
};

export const fetchChangeRequests = createAsyncThunk(
  'changeRequests/fetchChangeRequests',
  async (params: any) => {
    const response = await ChangeRequestService.getChangeRequests(params);
    return response;
  }
);

export const fetchChangeRequestById = createAsyncThunk(
  'changeRequests/fetchChangeRequestById',
  async (id: string) => {
    const response = await ChangeRequestService.getChangeRequestById(id);
    return response;
  }
);

export const deleteChangeRequest = createAsyncThunk(
  'changeRequests/deleteChangeRequest',
  async (id: string) => {
    await ChangeRequestService.deleteChangeRequest(id);
    return id;
  }
);

export const approveChangeRequest = createAsyncThunk(
  'changeRequests/approveChangeRequest',
  async (id: string) => {
    const response = await ChangeRequestService.approveChangeRequest(id);
    return response;
  }
);

export const rejectChangeRequest = createAsyncThunk(
  'changeRequests/rejectChangeRequest',
  async (params: { id: string; remarks?: string }) => {
    const response = await ChangeRequestService.rejectChangeRequest(params.id, {
      remarks: params.remarks,
    });
    return response;
  }
);

const changeRequestSlice = createSlice({
  name: 'changeRequests',
  initialState,
  reducers: {
    clearChangeRequestError: (state) => {
      state.error = null;
    },
    setChangeRequestPagination: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.pageInfo = { ...state.pageInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChangeRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChangeRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.changeRequests = action.payload.data;
        state.pageInfo = {
          current: action.payload.data?.pageInfo?.current,
          size: action.payload.data?.pageInfo?.size,
          sortMeta: '',
        };
      })
      .addCase(fetchChangeRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch change requests';
      })
      .addCase(fetchChangeRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChangeRequestById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.individualChangeRequest = action.payload?.data;
      })
      .addCase(fetchChangeRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch change request';
      })
      .addCase(deleteChangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChangeRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.changeRequests = {
          ...state.changeRequests,
          list: state?.changeRequests?.list?.filter(
            (request: any) => request.id !== action.payload
          ),
        };
      })
      .addCase(deleteChangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete change request';
      })
      .addCase(approveChangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveChangeRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.changeRequests = {
          ...state.changeRequests,
          list: state?.changeRequests?.list?.map((request: any) =>
            request.id === action.payload.id ? action.payload : request
          ),
        };
      })
      .addCase(approveChangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to approve change request';
      })
      .addCase(rejectChangeRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectChangeRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.changeRequests = {
          ...state.changeRequests,
          list: state?.changeRequests?.list?.map((request: any) =>
            request.id === action.payload.id ? action.payload : request
          ),
        };
      })
      .addCase(rejectChangeRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reject change request';
      });
  },
});

export const { clearChangeRequestError, setChangeRequestPagination } = changeRequestSlice.actions;
export default changeRequestSlice.reducer;
