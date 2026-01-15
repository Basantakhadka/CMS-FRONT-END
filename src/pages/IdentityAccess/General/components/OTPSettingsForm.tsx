import React from 'react';
import { Form, InputNumber, Switch, Button, Card, Space } from 'antd';
import type { OTPSettings } from '../../../../store/slices/generalSlice';

interface OTPSettingsFormProps {
  initialValues?: OTPSettings;
  onSubmit: (values: OTPSettings) => void;
  loading?: boolean;
}

const OTPSettingsForm: React.FC<OTPSettingsFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: OTPSettings) => {
    onSubmit(values);
  };

  return (
    <Card title="OTP Settings" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Enable OTP"
          name="enabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="OTP Expiry (Minutes)"
          name="expiryMinutes"
          rules={[{ required: true, message: 'Please enter expiry minutes' }]}
        >
          <InputNumber min={1} max={60} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Maximum Attempts"
          name="maxAttempts"
          rules={[{ required: true, message: 'Please enter maximum attempts' }]}
        >
          <InputNumber min={1} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Enable SMS OTP"
          name="smsEnabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Enable Email OTP"
          name="emailEnabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Enable Merchant OTP"
          name="merchantOTPEnabled"
          valuePropName="checked"
          tooltip="Allow merchants to use OTP for authentication"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Settings
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OTPSettingsForm;
