import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { CreateUserPayload, UpdateUserPayload } from '../../../../store/slices/usersSlice';

interface UserFormModalProps {
  visible: boolean;
  user?: any | null;
  roles: any;
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
        userName: user.userName,
        userId: user.userId,
        employeeId: user.employeeId,
        roles: user.roles,
        active: true
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
      title={user?.id ? 'Edit User' : 'Create User'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="User Id"
          name="userId"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter valid email' },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Employee Id"
          name="employeeId"
          rules={[
            { required: true, message: 'Please enter employee Id' },

          ]}
        >
          <Input placeholder="Enter Employee id" />
        </Form.Item>
        <Form.Item
          label="Roles"
          name="roles"
          rules={[{ required: true, message: 'Please select at least one role' }]}
        >
          <Select
            mode="multiple" 
            placeholder="Select roles"
            options={roles?.data?.map((role: any) => ({ label: role.label, value: role.value }))}
          />
        </Form.Item>
        <Form.Item
          name="active"
          hidden
          initialValue={true}

        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default UserFormModal;
