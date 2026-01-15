import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { Role, Permission, CreateRolePayload, UpdateRolePayload } from '../../../../store/slices/rolesSlice';

interface RoleFormModalProps {
  visible: boolean;
  role?: Role | null;
  permissions: Permission[];
  onSubmit: (values: CreateRolePayload | UpdateRolePayload) => void;
  onCancel: () => void;
  loading: boolean;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({
  visible,
  role,
  permissions,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && role) {
      form.setFieldsValue({
        name: role.name,
        description: role.description,
        permissions: role.permissions.map((p) => p.id),
      });
    } else if (visible && !role) {
      form.resetFields();
    }
  }, [visible, role, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (role) {
        onSubmit({ id: role.id, ...values } as UpdateRolePayload);
      } else {
        onSubmit(values as CreateRolePayload);
      }
    });
  };

  return (
    <Modal
      title={role ? 'Edit Role' : 'Create Role'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: 'Please enter role name' }]}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter role description" />
        </Form.Item>

        <Form.Item
          label="Permissions"
          name="permissions"
          rules={[{ required: true, message: 'Please select at least one permission' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select permissions"
            optionFilterProp="label"
            options={permissions.map((p) => ({
              label: `${p.name} (${p.resource}:${p.action})`,
              value: p.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleFormModal;
