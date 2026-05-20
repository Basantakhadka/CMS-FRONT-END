import React, { useEffect } from 'react';
import { Breadcrumb, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import AddRoleForm from '../components/AddRoleForm';
import { createRole, fetchContractsForRoles, fetchPermissions, fetchRoleById, updateRole } from '../../../../store/slices/rolesSlice';
import { useParams } from 'react-router-dom';
import { CLIENT_CODE } from '../../../../constants';
import { getLocalStorage } from '../../../../utils/storageUtils';

const AddRoleContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const clientCode = getLocalStorage(CLIENT_CODE) || '';
    const shouldShowContracts = clientCode !== '000';
    const { permissions, selectedRole, contracts } = useAppSelector(
        (state) => state.roles
    );

    // 🔹 Handle submit coming from form
    const handleSubmit = async (payload: {
        title: string;
        permissions: string[];
        contractIds: string[];
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
            console.log('Failed to create role');
        }
    };

    useEffect(() => {
        dispatch(fetchPermissions());
        if (shouldShowContracts) {
            dispatch(fetchContractsForRoles());
        }
        if (id) {
            dispatch(fetchRoleById(id));
        }
    }, [dispatch, id, shouldShowContracts]);
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

                <AddRoleForm
                    onSubmit={handleSubmit}
                    permissions={permissions}
                    contracts={contracts}
                    showContractsField={shouldShowContracts}
                    selectedRole={id ? selectedRole : []}
                />
            </div>

        </>

    );
};

export default AddRoleContainer;
