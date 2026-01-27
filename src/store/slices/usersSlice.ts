import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { usersService } from '../../pages/IdentityAccess/Users/services/usersService';

export interface User {
    userName: string;
    userId: string;
    employeeId: string,
    roles: string[];
    active: Boolean;

}

export interface CreateUserPayload {
    userName: string;
    userId: string;
    employeeId: string,
    roles: string[];
    active: true;
}

export interface UpdateUserPayload {
    id: string;
    userName?: string;
    userId?: string;
    employeeId: string;
    roles?: string[];
    acrive: true;
}

export interface Role {
    id: string;
    name: string;
}


export interface UsersState {
    users: any;
    loading: boolean;
    error: string | null;
    roles: {
        data: Role[];
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
    users: [],
    loading: false,
    error: null,
    roles: {
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
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: any) => {
        console.log({ params })
        const response = await usersService.getUsers(params);
        return response;
    }
);

export const fetchRoleDropDown = createAsyncThunk<any>(
    'users/fetchRoleDropDown',
    async () => {
        const response = await usersService.getRoleDropdown();
        return response.data;
    }
);
export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id: string) => {
        const response = await usersService.getUserById(id);
        return response;
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData: CreateUserPayload) => {
        const response = await usersService.createUser(userData);
        return response;
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (userData: UpdateUserPayload) => {
        const response = await usersService.updateUser(userData);
        return response;
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: string) => {
        await usersService.deleteUser(id);
        return id;
    }
);


const usersSlice = createSlice({
    name: 'users',
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
        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Fetch User By ID
            // .addCase(fetchUserById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
            //     state.loading = false;
            //     state.users = action.payload;
            // })
            // .addCase(fetchUserById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to fetch user';
            // })
            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create user';
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.users = state?.users?.list?.map((user: any) =>
                    user.id === action.payload.id
                        ? action.payload
                        : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })

            // // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.users = state?.users?.list?.filter((user: any) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            })
            // Assign Roles
            .addCase(fetchRoleDropDown.pending, (state) => {
                state.roles.loading = true;
                state.roles.error = null;
            })
            .addCase(fetchRoleDropDown.fulfilled, (state, action: PayloadAction<Role[]>) => {
                state.roles.loading = false;
                state.roles.data = action.payload;
            })
            .addCase(fetchRoleDropDown.rejected, (state, action) => {
                state.roles.loading = false;
                state.roles.error =
                    action.error.message || 'Failed to fetch role dropdown';
            });
    },
});

export const { clearError, setPagination } = usersSlice.actions;
export default usersSlice.reducer;
