import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { rolesService } from '../../pages/IdentityAccess/Roles/services/rolesService';


export interface Role {
    id: string;
    title: string;
    createdOn: string;
    lastModifiedOn: string;
    status: string;
}

export interface CreateRolePayload {
    title: string;
    permissions: string[];
    active: boolean;
}

export interface RolesState {
    roles: any;
    permissions: any;
    selectedRole: any | null;
    loading: boolean;
    error: string | null;
    pageInfo: {
        current: number;
        size: number;
        sortMeta: string;
    };
}

const initialState: RolesState = {
    roles: [],
    permissions: [],
    selectedRole: null,
    loading: false,
    error: null,
    pageInfo: {
        current: 1,
        size: 10,
        sortMeta: ''
    },
};

// Async Thunks
export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async (params: any) => {
        console.log({ params })
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
    async ({ roleData, id }: { roleData: any; id: string }) => {
        const response = await rolesService.updateRole(roleData, id);
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
            state.pageInfo = { ...state.pageInfo, ...action.payload };
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
                state.pageInfo = {
                    current: action.payload.data?.pageInfo?.current,
                    size: action.payload.data?.pageInfo?.size,
                    sortMeta: ''
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
            .addCase(fetchRoleById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.selectedRole = action.payload?.data;
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
            .addCase(fetchPermissions.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.permissions = action.payload?.data;
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
            .addCase(updateRole.fulfilled, (state, action: any) => {
                state.loading = false;

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
            .addCase(deleteRole.fulfilled, (state, action: any) => {
                state.loading = false;
                // state.roles = state.roles.filter((role: any) => role.id !== action.payload);

            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete role';
            })


    },
});

export const { clearError, clearSelectedRole, setPagination } = rolesSlice.actions;
export default rolesSlice.reducer;
