import React from 'react';
import { Form, Switch, Button, Card, Space, Checkbox } from 'antd';
import type { MFASettings } from '../../../../store/slices/generalSlice';

interface MFASettingsFormProps {
  initialValues?: MFASettings;
  onSubmit: (values: MFASettings) => void;
  loading?: boolean;
}

const MFASettingsForm: React.FC<MFASettingsFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: MFASettings) => {
    onSubmit(values);
  };

  return (
    <Card title="Multi-Factor Authentication Settings" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Enable MFA"
          name="enabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="MFA Methods"
          name="methods"
        >
          <Checkbox.Group
            options={[
              { label: 'SMS', value: 'sms' },
              { label: 'Email', value: 'email' },
              { label: 'Authenticator App', value: 'authenticator' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="MFA Mandatory for All Users"
          name="mandatory"
          valuePropName="checked"
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

export default MFASettingsForm;
