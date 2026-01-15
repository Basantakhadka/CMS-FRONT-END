import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { User, CreateUserPayload, UpdateUserPayload } from '../../../../store/slices/usersSlice';

interface UserFormModalProps {
  visible: boolean;
  user?: User | null;
  roles: string[];
  onSubmit: (values: CreateUserPayload | UpdateUserPayload) => void;
  onCancel: () => void;
  loading: boolean;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  visible,
  user,
  roles,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        status: user.status,
        roles: user.roles,
      });
    } else if (visible && !user) {
      form.resetFields();
    }
  }, [visible, user, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (user) {
        onSubmit({ id: user.id, ...values } as UpdateUserPayload);
      } else {
        onSubmit(values as CreateUserPayload);
      }
    });
  };

  return (
    <Modal
      title={user ? 'Edit User' : 'Create User'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>

        {!user && (
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        )}

        {user && (
          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="suspended">Suspended</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="Roles"
          name="roles"
          rules={[{ required: true, message: 'Please select at least one role' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select roles"
            options={roles.map((role) => ({ label: role, value: role }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
