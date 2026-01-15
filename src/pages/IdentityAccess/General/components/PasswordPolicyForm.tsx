import React from 'react';
import { Form, InputNumber, Switch, Button, Card, Space } from 'antd';
import type { PasswordPolicy } from '../../../../store/slices/generalSlice';

interface PasswordPolicyFormProps {
  initialValues?: PasswordPolicy;
  onSubmit: (values: PasswordPolicy) => void;
  loading?: boolean;
}

const PasswordPolicyForm: React.FC<PasswordPolicyFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: PasswordPolicy) => {
    onSubmit(values);
  };

  return (
    <Card title="Password Policy" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Minimum Length"
          name="minLength"
          rules={[{ required: true, message: 'Please enter minimum length' }]}
        >
          <InputNumber min={6} max={32} style={{ width: '100%' }} />
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
          <InputNumber min={0} max={365} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Prevent Password Reuse (Last N passwords)"
          name="preventReuse"
          rules={[{ required: true, message: 'Please enter prevent reuse count' }]}
        >
          <InputNumber min={0} max={24} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Policy
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordPolicyForm;
