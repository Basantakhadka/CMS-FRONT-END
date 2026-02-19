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
    } catch (err: any) {
     console.log('Failed to delete user', err);
    }
  };


  const mapRolesWithLabelValue = (
    roleIds: any,
    rolesData: any
  ) => {
    return roleIds?.map((roleId: any) => {
      const role = rolesData?.data?.find((r: any) => r.value === roleId);
      return {
        label: role?.label ?? "",
        value: roleId,
      };
    });
  };
  const handleSubmit = async (values: CreateUserPayload | UpdateUserPayload) => {
    try {
      const payload = {
        ...values,
        roles: mapRolesWithLabelValue(values?.roles, roles?.data),
      };
      if ('id' in values) {
        await dispatch(
          updateUser(payload as UpdateUserPayload)
        ).unwrap();
        message.success('User updated successfully');
      } else {
        await dispatch(
          createUser(payload as CreateUserPayload)
        ).unwrap();

        message.success('User created successfully');
      }

      setModalVisible(false);
      setSelectedUser(null);
      setReload(prev => !prev);

    } catch (err) {
     console.error('Error in handleSubmit:', err);
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
