import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

const SettingsView: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings saved:', values);
  };

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Settings</h1>

      <Card title="General Settings" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: 'CMS System',
            language: 'en',
            notifications: true,
            darkMode: false,
          }}
        >
          <Form.Item
            label="Site Name"
            name="siteName"
            rules={[{ required: true, message: 'Please enter site name' }]}
          >
            <Input placeholder="Enter site name" />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
          >
            <Select>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item
            label="Enable Notifications"
            name="notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Dark Mode"
            name="darkMode"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Account Settings">
        <Form layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            initialValue="admin@example.com"
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Current Password"
            name="currentPassword"
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />}>
              Update Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsView;
