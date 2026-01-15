import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setPagination,
} from '../../../../store/slices/usersSlice';
import type { CreateUserPayload, UpdateUserPayload, User } from '../../../../store/slices/usersSlice';
import UsersList from '../components/UsersList';
import UserFormModal from '../components/UserFormModal';

const UsersContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, pagination, error } = useAppSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock roles - in real app, fetch from roles state
  const availableRoles = ['Admin', 'Manager', 'User', 'Merchant'];

  useEffect(() => {
    dispatch(fetchUsers({ page: pagination.page, pageSize: pagination.pageSize }));
  }, [dispatch, pagination.page, pagination.pageSize]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleCreate = () => {
    setSelectedUser(null);
    setModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      message.success('User deleted successfully');
    } catch (err) {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async (values: CreateUserPayload | UpdateUserPayload) => {
    try {
      if ('id' in values) {
        await dispatch(updateUser(values as UpdateUserPayload)).unwrap();
        message.success('User updated successfully');
      } else {
        await dispatch(createUser(values as CreateUserPayload)).unwrap();
        message.success('User created successfully');
      }
      setModalVisible(false);
      setSelectedUser(null);
    } catch (err) {
      message.error(`Failed to ${selectedUser ? 'update' : 'create'} user`);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = (value: string) => {
    dispatch(fetchUsers({ page: 1, pageSize: pagination.pageSize, search: value }));
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>User Management</h2>
      <UsersList
        users={users}
        loading={loading}
        pagination={pagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
      <UserFormModal
        visible={modalVisible}
        user={selectedUser}
        roles={availableRoles}
        onSubmit={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          setSelectedUser(null);
        }}
        loading={loading}
      />
    </div>
  );
};

export default UsersContainer;
