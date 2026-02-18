import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchRoles,
  // createRole,
  // updateRole,
  deleteRole,
  setPagination,
} from '../../../../store/slices/rolesSlice';
import RolesList from '../components/RolesList';
import { useNavigate } from 'react-router-dom';

const RolesContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { roles, loading, pageInfo } = useAppSelector(
    (state) => state.roles
  );
  const [reload, setReload] = useState(false);


  const handleCreate = () => {
    navigate('add')
  };

  const handleEdit = (id: string) => {
    navigate(`edit/${ id }`)

  };

  const handleDelete = async (roleId: string) => {
    try {
      await dispatch(deleteRole(roleId)).unwrap();
      message.success('Role deleted successfully');
      setReload(prev => !prev);
    } catch (err) {
      message.error('Failed to delete role');
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => {
  };

  useEffect(() => {
    dispatch(fetchRoles({ filters: [], pageInfo }));
  }, [dispatch, reload]);

  return (
    <>
      <h2>Role Management</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <RolesList
          roles={roles}
          loading={loading}
          pagination={pageInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onAssignUsers={() => { }}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
      </div>
    </>

  );
};

export default RolesContainer;
