import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { rolesService } from '../../pages/IdentityAccess/Roles/services/rolesService';

export interface Permission {
    id: string;
    name: string;
    resource: string;
    action: string;
    description?: string;
}

export interface Role {
    id: string;
    name: string;
    description?: string;
    permissions: Permission[];
    isSystem: boolean;
    userCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRolePayload {
    name: string;
    description?: string;
    permissions: string[];
}

export interface UpdateRolePayload {
    id: string;
    name?: string;
    description?: string;
    permissions?: string[];
}

export interface RolesState {
    roles: Role[];
    permissions: Permission[];
    selectedRole: Role | null;
    loading: boolean;
    error: string | null;
    pagination: {
        total: number;
        page: number;
        pageSize: number;
    };
}

const initialState: RolesState = {
    roles: [],
    permissions: [],
    selectedRole: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        pageSize: 10,
    },
};

// Async Thunks
export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async (params: { page?: number; pageSize?: number; search?: string } = {}) => {
        const response = await rolesService.getRoles(params);
        return response;
    }
);

export const fetchRoleById = createAsyncThunk(
    'roles/fetchRoleById',
    async (id: string) => {
        const response = await rolesService.getRoleById(id);
        return response;
    }
);

export const fetchPermissions = createAsyncThunk(
    'roles/fetchPermissions',
    async () => {
        const response = await rolesService.getPermissions();
        return response;
    }
);

export const createRole = createAsyncThunk(
    'roles/createRole',
    async (roleData: CreateRolePayload) => {
        const response = await rolesService.createRole(roleData);
        return response;
    }
);

export const updateRole = createAsyncThunk(
    'roles/updateRole',
    async (roleData: UpdateRolePayload) => {
        const response = await rolesService.updateRole(roleData);
        return response;
    }
);

export const deleteRole = createAsyncThunk(
    'roles/deleteRole',
    async (id: string) => {
        await rolesService.deleteRole(id);
        return id;
    }
);

export const assignRoleToUsers = createAsyncThunk(
    'roles/assignRoleToUsers',
    async ({ roleId, userIds }: { roleId: string; userIds: string[] }) => {
        const response = await rolesService.assignRoleToUsers(roleId, userIds);
        return response;
    }
);

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSelectedRole: (state) => {
            state.selectedRole = null;
        },
        setPagination: (state, action: PayloadAction<{ page: number; pageSize: number }>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        // Fetch Roles
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload.data;
                state.pagination = {
                    total: action.payload.total,
                    page: action.payload.page,
                    pageSize: action.payload.pageSize,
                };
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch roles';
            })
            // Fetch Role By ID
            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoleById.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                state.selectedRole = action.payload;
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch role';
            })
            // Fetch Permissions
            .addCase(fetchPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPermissions.fulfilled, (state, action: PayloadAction<Permission[]>) => {
                state.loading = false;
                state.permissions = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch permissions';
            })
            // Create Role
            .addCase(createRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRole.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                state.roles.unshift(action.payload);
                state.pagination.total += 1;
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create role';
            })
            // Update Role
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                const index = state.roles.findIndex((role) => role.id === action.payload.id);
                if (index !== -1) {
                    state.roles[index] = action.payload;
                }
                if (state.selectedRole?.id === action.payload.id) {
                    state.selectedRole = action.payload;
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update role';
            })
            // Delete Role
            .addCase(deleteRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRole.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.roles = state.roles.filter((role) => role.id !== action.payload);
                state.pagination.total -= 1;
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete role';
            })
            // Assign Role to Users
            .addCase(assignRoleToUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignRoleToUsers.fulfilled, (state, action: PayloadAction<Role>) => {
                state.loading = false;
                const index = state.roles.findIndex((role) => role.id === action.payload.id);
                if (index !== -1) {
                    state.roles[index] = action.payload;
                }
                if (state.selectedRole?.id === action.payload.id) {
                    state.selectedRole = action.payload;
                }
            })
            .addCase(assignRoleToUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to assign role to users';
            });
    },
});

export const { clearError, clearSelectedRole, setPagination } = rolesSlice.actions;
export default rolesSlice.reducer;
