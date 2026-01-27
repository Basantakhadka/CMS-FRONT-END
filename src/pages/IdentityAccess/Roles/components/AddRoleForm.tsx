import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Space,
    Checkbox,
    Divider,
} from 'antd';

interface PermissionGroup {
    key: string;
    title: string;
    children: { key: string; title: string }[];
}


interface AddRoleFormProps {
    onSubmit: (payload: {
        title: string;
        permissions: string[];
        active: any;
    }) => any;
    permissions: any
    selectedRole?: any
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({ onSubmit, permissions, selectedRole }) => {
    const [form] = Form.useForm();
    const [selectedPermissions, setSelectedPermissions] = useState<any>(selectedRole?.role?.permissions || []);

    // Toggle all permissions in a group
    const toggleGroup = (group: PermissionGroup) => {
        const keys = group.children.map(c => c.key);
        const allChecked = keys.every(k => selectedPermissions?.includes(k));

        setSelectedPermissions(
            allChecked
                ? selectedPermissions.filter((k: any) => !keys.includes(k))
                : Array.from(new Set([...selectedPermissions, ...keys]))
        );
    };

    const submitForm = async () => {
        try {
            const values = await form.validateFields();

            onSubmit({
                title: values.title,
                permissions: selectedPermissions,
                active: true
            });

            form.resetFields();
            setSelectedPermissions([]);
        } catch {
            // validation handled by form
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"

        >
            <Form.Item
                label="Role Title"
                name="title"
                initialValue={selectedRole?.role?.title}
                rules={[{ required: true, message: 'Please enter role name' }]}
                style={{
                    width: "25%"
                }}
            >
                <Input placeholder="Enter role name" />
            </Form.Item>

            <Form.Item label="Permissions" >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {permissions?.map((group: any) => {
                        const groupKeys = group.children.map((c: any) => c.key);
                        const allChecked = groupKeys.every((k: any) => selectedPermissions?.includes(k));
                        const someChecked =
                            groupKeys.some((k: any) => selectedPermissions?.includes(k)) && !allChecked;

                        return (
                            <div key={group.key} style={{
                                padding: 16,
                                borderRadius: 10,
                                background: '#fff',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                width: '100%'
                            }}>
                                <Space align="center">
                                    <Checkbox
                                        indeterminate={someChecked}
                                        checked={allChecked}
                                        onChange={() => toggleGroup(group)}
                                    >
                                        <strong>{group.title}</strong>
                                    </Checkbox>
                                </Space>

                                <div style={{ marginTop: 8, paddingLeft: 24 }}>
                                    <Checkbox.Group
                                        value={selectedPermissions}
                                        onChange={(values) =>
                                            setSelectedPermissions(values as string[])
                                        }
                                    >
                                        <Space wrap>
                                            {group.children.map((child: any) => (
                                                <Checkbox key={child.key} value={child.key}>
                                                    {child.title}
                                                </Checkbox>
                                            ))}
                                        </Space>
                                    </Checkbox.Group>
                                </div>

                                <Divider style={{ margin: '16px 0' }} />
                            </div>
                        );
                    })}
                </Space>
            </Form.Item>

            <Form.Item style={{ float: 'right' }}>
                <Space>
                    <Button type="primary" onClick={submitForm} >
                        {selectedRole?.role?.permissions?.length > 0 ? "Edit Role" : " Create Role"}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddRoleForm;
