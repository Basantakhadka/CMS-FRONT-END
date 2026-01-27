import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setPagination,
  fetchRoleDropDown
} from '../../../../store/slices/usersSlice';
import type { CreateUserPayload, UpdateUserPayload, User } from '../../../../store/slices/usersSlice';
import UsersList from '../components/UsersList';
import UserFormModal from '../components/UserFormModal';

const UsersContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, pageInfo, roles } = useAppSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [reload, setReload] = useState(false);





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
      setSelectedUser(null);
      setReload(prev => !prev);
      return
    } catch (err) {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async (values: CreateUserPayload | UpdateUserPayload) => {
    try {
      console.log('Dispatching updateUser with:', values);
      if ('id' in values) {
        const result = await dispatch(updateUser(values as UpdateUserPayload)).unwrap();
        console.log('Update result:', result);
        message.success('User updated successfully');
        setModalVisible(false);
        setSelectedUser(null);
        setReload(prev => !prev);
        return
      } else {
        const result = await dispatch(createUser(values as CreateUserPayload)).unwrap();
        console.log('Create result:', result);
        message.success('User created successfully');
        setModalVisible(false);
        setSelectedUser(null);
        setReload(prev => !prev);
        return
      }

    } catch (err) {
      console.error('Caught error:', err);
      message.error(`Failed to ${ selectedUser ? 'update' : 'create' } user`);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => { }

  useEffect(() => {
    dispatch(fetchUsers({ filters: [], pageInfo }));
    dispatch(fetchRoleDropDown())
  }, [dispatch, reload]);



  return (
    <>
      <h2>User Management</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <UsersList
          users={users}
          loading={loading}
          pagination={pageInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
        <UserFormModal
          visible={modalVisible}
          user={selectedUser}
          roles={roles?.data}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalVisible(false);
            setSelectedUser(null);
          }}
          loading={loading}
        />
      </div>
    </>

  );
};

export default UsersContainer;
