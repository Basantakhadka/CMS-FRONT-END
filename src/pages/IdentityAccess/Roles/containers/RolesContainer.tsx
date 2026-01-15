import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchRoles,
  fetchPermissions,
  createRole,
  updateRole,
  deleteRole,
  assignRoleToUsers,
  setPagination,
} from '../../../../store/slices/rolesSlice';
import type { CreateRolePayload, UpdateRolePayload, Role } from '../../../../store/slices/rolesSlice';
import { fetchUsers } from '../../../../store/slices/usersSlice';
import RolesList from '../components/RolesList';
import RoleFormModal from '../components/RoleFormModal';
import AssignUsersModal from '../components/AssignUsersModal';

const RolesContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles, permissions, loading, pagination, error } = useAppSelector(
    (state) => state.roles
  );
  const { users } = useAppSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    dispatch(fetchRoles({ page: pagination.page, pageSize: pagination.pageSize }));
    dispatch(fetchPermissions());
    dispatch(fetchUsers({ page: 1, pageSize: 1000 })); // Fetch all users for assignment
  }, [dispatch, pagination.page, pagination.pageSize]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleCreate = () => {
    setSelectedRole(null);
    setModalVisible(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setModalVisible(true);
  };

  const handleDelete = async (roleId: string) => {
    try {
      await dispatch(deleteRole(roleId)).unwrap();
      message.success('Role deleted successfully');
    } catch (err) {
      message.error('Failed to delete role');
    }
  };

  const handleAssignUsers = (role: Role) => {
    setSelectedRole(role);
    setAssignModalVisible(true);
  };

  const handleSubmit = async (values: CreateRolePayload | UpdateRolePayload) => {
    try {
      if ('id' in values) {
        await dispatch(updateRole(values as UpdateRolePayload)).unwrap();
        message.success('Role updated successfully');
      } else {
        await dispatch(createRole(values as CreateRolePayload)).unwrap();
        message.success('Role created successfully');
      }
      setModalVisible(false);
      setSelectedRole(null);
    } catch (err) {
      message.error(`Failed to ${selectedRole ? 'update' : 'create'} role`);
    }
  };

  const handleAssignSubmit = async (userIds: string[]) => {
    if (!selectedRole) return;

    try {
      await dispatch(assignRoleToUsers({ roleId: selectedRole.id, userIds })).unwrap();
      message.success('Users assigned to role successfully');
      setAssignModalVisible(false);
      setSelectedRole(null);
    } catch (err) {
      message.error('Failed to assign users to role');
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = (value: string) => {
    dispatch(fetchRoles({ page: 1, pageSize: pagination.pageSize, search: value }));
  };

  // Get assigned user IDs for selected role
  const getAssignedUserIds = (): string[] => {
    if (!selectedRole) return [];
    return users
      .filter((user) => user.roles.includes(selectedRole.name))
      .map((user) => user.id);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Role Management</h2>
      <RolesList
        roles={roles}
        loading={loading}
        pagination={pagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onAssignUsers={handleAssignUsers}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      <RoleFormModal
        visible={modalVisible}
        role={selectedRole}
        permissions={permissions}
        onSubmit={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          setSelectedRole(null);
        }}
        loading={loading}
      />
      <AssignUsersModal
        visible={assignModalVisible}
        roleName={selectedRole?.name || ''}
        allUsers={users}
        assignedUserIds={getAssignedUserIds()}
        onAssign={handleAssignSubmit}
        onCancel={() => {
          setAssignModalVisible(false);
          setSelectedRole(null);
        }}
        loading={loading}
      />
    </div>
  );
};

export default RolesContainer;
