
import type { Role, CreateRolePayload } from '../../../../store/slices/rolesSlice';
import { store, fetch, update, destroy } from '../../../../utils/httpUtil';

export const rolesService = {
    getRoles: async (params: any) => {
        const response = await store('identity-access/roles/list', params);
        return response.data;
    },


    getRoleById: async (id: string): Promise<Role> => {
        const response = await fetch(`identity-access/roles/${ id }`);
        return response.data;
    },

    getPermissions: async (): Promise<any> => {
        const response = await fetch('identity-access/roles-permissionsui');
        return response.data;
    },

    createRole: async (roleData: CreateRolePayload): Promise<Role> => {
        const response = await store('identity-access/roles', roleData);
        return response.data;
    },

    updateRole: async (roleData: any, id: any): Promise<any> => {
        // const { id, ...data } = roleData;
        console.log({ roleData })
        const response = await update(`identity-access/roles/${ id }`, roleData);
        return response.data;
    },

    deleteRole: async (id: string): Promise<void> => {
        await destroy(`identity-access/roles/${ id }`);
    },

};
