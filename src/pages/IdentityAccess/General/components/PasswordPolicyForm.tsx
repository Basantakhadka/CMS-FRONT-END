import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Switch, Button, Card, Space } from 'antd';
import type { PasswordPolicy } from '../../../../store/slices/generalSlice';

interface PasswordPolicyFormProps {
  initialValues: PasswordPolicy | null; // API might return null initially
  onSubmit: (values: PasswordPolicy) => void;
  loading?: boolean;
}

const PasswordPolicyForm: React.FC<PasswordPolicyFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [ready, setReady] = useState(false); // flag to know when API data is loaded

  /** Populate form when API data arrives */
  useEffect(() => {
    if (initialValues && !ready) {
      form.setFieldsValue({
        minLength: initialValues.minLength ?? 8,
        maxLength: initialValues.maxLength ?? 12,
        requireUppercase: initialValues.requireUppercase ?? true,
        requireLowercase: initialValues.requireLowercase ?? true,
        requireNumbers: initialValues.requireNumbers ?? true,
        requireSpecialChars: initialValues.requireSpecialChars ?? false,
        expiryDays: initialValues.expiryDays ?? 90,
      });
      setReady(true); // only set once
    }
  }, [initialValues, form, ready]);

  const handleSubmit = (values: PasswordPolicy) => {
    onSubmit(values);
  };

  // Do not pass initialValues to Form, only use form.setFieldsValue
  return (
    <Card title="Password Policy" bordered={false}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Minimum Length"
          name="minLength"
          rules={[{ required: true, message: 'Please enter minimum length' }]}
        >
          <InputNumber min={6} max={15} style={{ width: '25%' }} />
        </Form.Item>

        <Form.Item
          label="Maximum Length"
          name="maxLength"
          rules={[{ required: true, message: 'Please enter maximum length' }]}
        >
          <InputNumber min={6} max={15} style={{ width: '25%' }} />
        </Form.Item>

        <Form.Item
          label="Require Uppercase Letters"
          name="requireUppercase"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Require Lowercase Letters"
          name="requireLowercase"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Require Numbers"
          name="requireNumbers"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Require Special Characters"
          name="requireSpecialChars"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Password Expiry (Days)"
          name="expiryDays"
          rules={[{ required: true, message: 'Please enter expiry days' }]}
        >
          <InputNumber min={0} max={365} style={{ width: '25%' }} />
        </Form.Item>

        <Form.Item style={{ float: 'right' }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Policy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordPolicyForm;
