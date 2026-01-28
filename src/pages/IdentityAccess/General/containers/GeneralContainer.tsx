import React from 'react';
import { Row, Col, message, Breadcrumb } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {

  updatePasswordPolicy,
} from '../../../../store/slices/generalSlice';
import type { PasswordPolicy } from '../../../../store/slices/generalSlice';
import PasswordPolicyForm from '../components/PasswordPolicyForm';
import { useNavigate } from 'react-router-dom';

const GeneralContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { passwordPolicy, loading } = useAppSelector(
    (state) => state.general
  );




  const handlePasswordPolicySubmit = async (values: PasswordPolicy) => {
    try {
      await dispatch(updatePasswordPolicy(values)).unwrap();
      message.success('Password policy updated successfully');
    } catch (err) {
      message.error('Failed to update password policy');
    }
  };


  return (

    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item onClick={() => navigate('/dashboard')} >Home</Breadcrumb.Item>
        <Breadcrumb.Item>Identity And Access</Breadcrumb.Item>
        <Breadcrumb.Item>General</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={12} lg={24}>
            <PasswordPolicyForm
              initialValues={passwordPolicy || undefined}
              onSubmit={handlePasswordPolicySubmit}
              loading={loading}
            />
          </Col>

        </Row>
      </div>

    </>

  );
};

export default GeneralContainer;
