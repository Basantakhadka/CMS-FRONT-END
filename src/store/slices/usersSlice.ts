import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { usersService } from '../../pages/IdentityAccess/Users/services/usersService';

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    status: 'active' | 'inactive' | 'suspended';
    roles: string[];
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

export interface CreateUserPayload {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    password: string;
    roles: string[];
}

export interface UpdateUserPayload {
    id: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: 'active' | 'inactive' | 'suspended';
    roles?: string[];
}

export interface UsersState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        pageSize: number;
    };
}

const initialState: UsersState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        pageSize: 10,
    },
};

// Async Thunks
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: { page?: number; pageSize?: number; search?: string } = {}) => {
        const response = await usersService.getUsers(params);
        return response;
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

export const assignRolesToUser = createAsyncThunk(
    'users/assignRoles',
    async ({ userId, roleIds }: { userId: string; roleIds: string[] }) => {
        const response = await usersService.assignRoles(userId, roleIds);
        return response;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        setPagination: (state, action: PayloadAction<{ page: number; pageSize: number }>) => {
            state.pagination = { ...state.pagination, ...action.payload };
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
                state.pagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    pageSize: action.payload.pageSize,
                };
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Fetch User By ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.users.unshift(action.payload);
                state.pagination.total += 1;
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
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
                state.pagination.total -= 1;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            })
            // Assign Roles
            .addCase(assignRolesToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignRolesToUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                if (state.selectedUser?.id === action.payload.id) {
                    state.selectedUser = action.payload;
                }
            })
            .addCase(assignRolesToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to assign roles';
            });
    },
});

export const { clearError, clearSelectedUser, setPagination } = usersSlice.actions;
export default usersSlice.reducer;
