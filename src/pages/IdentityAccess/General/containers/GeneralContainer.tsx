import React, { useEffect } from 'react';
import { Row, Col, Space, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchPasswordPolicy,
  updatePasswordPolicy,
  fetchMFASettings,
  updateMFASettings,
  fetchOTPSettings,
  updateOTPSettings,
} from '../../../../store/slices/generalSlice';
import type { PasswordPolicy, MFASettings, OTPSettings } from '../../../../store/slices/generalSlice';
import PasswordPolicyForm from '../components/PasswordPolicyForm';
import MFASettingsForm from '../components/MFASettingsForm';
import OTPSettingsForm from '../components/OTPSettingsForm';

const GeneralContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { passwordPolicy, mfaSettings, otpSettings, loading, error } = useAppSelector(
    (state) => state.general
  );

  useEffect(() => {
    dispatch(fetchPasswordPolicy());
    dispatch(fetchMFASettings());
    dispatch(fetchOTPSettings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handlePasswordPolicySubmit = async (values: PasswordPolicy) => {
    try {
      await dispatch(updatePasswordPolicy(values)).unwrap();
      message.success('Password policy updated successfully');
    } catch (err) {
      message.error('Failed to update password policy');
    }
  };

  const handleMFASettingsSubmit = async (values: MFASettings) => {
    try {
      await dispatch(updateMFASettings(values)).unwrap();
      message.success('MFA settings updated successfully');
    } catch (err) {
      message.error('Failed to update MFA settings');
    }
  };

  const handleOTPSettingsSubmit = async (values: OTPSettings) => {
    try {
      await dispatch(updateOTPSettings(values)).unwrap();
      message.success('OTP settings updated successfully');
    } catch (err) {
      message.error('Failed to update OTP settings');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <PasswordPolicyForm
              initialValues={passwordPolicy || undefined}
              onSubmit={handlePasswordPolicySubmit}
              loading={loading}
            />
          </Col>
          <Col xs={24} lg={12}>
            <MFASettingsForm
              initialValues={mfaSettings || undefined}
              onSubmit={handleMFASettingsSubmit}
              loading={loading}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <OTPSettingsForm
              initialValues={otpSettings || undefined}
              onSubmit={handleOTPSettingsSubmit}
              loading={loading}
            />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default GeneralContainer;
