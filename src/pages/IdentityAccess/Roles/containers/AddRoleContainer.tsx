import React, { useEffect } from 'react';
import { Breadcrumb, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import AddRoleForm from '../components/AddRoleForm';
import { createRole, fetchPermissions, fetchRoleById, updateRole } from '../../../../store/slices/rolesSlice';
import { useParams } from 'react-router-dom';

const AddRoleContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { permissions, selectedRole } = useAppSelector(
        (state) => state.roles
    );

    // 🔹 Handle submit coming from form
    const handleSubmit = async (payload: {
        title: string;
        permissions: string[];
        active: true;
    }) => {
        try {
            if (id) {
                await dispatch(updateRole({ roleData: payload, id })).unwrap();
                message.success('Role updated successfully');
                navigate('/iam/roles');

            } else {
                await dispatch(createRole(payload)).unwrap();
                message.success('Role created successfully');
                navigate('/iam/roles');
            }

        } catch (error) {
            message.error('Failed to create role');
        }
    };

    useEffect(() => {
        dispatch(fetchPermissions());
        if (id) {
            dispatch(fetchRoleById(id));
        }
    }, [dispatch]);
    return (
        <>
            <Breadcrumb style={{ marginBottom: 16 }}>
                <Breadcrumb.Item onClick={() => navigate('/dashboard')}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate('/iam/roles')}>
                    Roles
                </Breadcrumb.Item>
                <Breadcrumb.Item>Add Role</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: '24px 24px 24px 0px' }}>

                <AddRoleForm onSubmit={handleSubmit} permissions={permissions} selectedRole={selectedRole} />
            </div>

        </>

    );
};

export default AddRoleContainer;
