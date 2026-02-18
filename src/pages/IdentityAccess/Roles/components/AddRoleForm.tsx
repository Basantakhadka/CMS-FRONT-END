import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Space, Checkbox, Divider } from "antd";

interface PermissionChild {
    key: string;
    title: string;
}

interface PermissionGroup {
    key: string;
    title: string;
    children: PermissionChild[];
}

interface AddRoleFormProps {
    onSubmit: any;
    permissions: PermissionGroup[];
    selectedRole?: any;
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({
    onSubmit,
    permissions,
    selectedRole,
}) => {
    const [form] = Form.useForm();

    // Single source of truth for permissions
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    // Ref ensures we initialize edit mode only once
    const initialized = useRef(false);

    /** Initialize state once when editing a role */
    useEffect(() => {
        if (selectedRole?.role && !initialized.current) {
            form.setFieldsValue({
                title: selectedRole.role.title,
            });
            setSelectedPermissions(selectedRole.role.permissions || []);
            initialized.current = true;
        }

        // Reset when creating new role
        if (!selectedRole) {
            initialized.current = false;
            form.resetFields();
            setSelectedPermissions([]);
        }
    }, [selectedRole, form]);

    /** Toggle all permissions in a group */
    const toggleGroup = (group: PermissionGroup) => {
        const keys = group.children.map((c) => c.key);
        const allChecked = keys.every((k) => selectedPermissions.includes(k));

        if (allChecked) {
            setSelectedPermissions((prev) => prev.filter((k) => !keys.includes(k)));
        } else {
            setSelectedPermissions((prev) => Array.from(new Set([...prev, ...keys])));
        }
    };

    /** Submit form */
    const submitForm = async () => {
        try {
            const values = await form.validateFields();

            onSubmit({
                title: values.title,
                permissions: selectedPermissions,
                active: true,
            });

            // Optional: reset for create mode
            form.resetFields();
            setSelectedPermissions([]);
            initialized.current = false;
        } catch {
            // validation handled by Form
        }
    };

    return (
        <Form form={form} layout="vertical">
            {/* ROLE TITLE */}
            <Form.Item
                label="Role Title"
                name="title"
                rules={[{ required: true, message: "Please enter role name" }]}
                style={{ width: "25%" }}
            >
                <Input placeholder="Enter role name" />
            </Form.Item>

            {/* PERMISSIONS */}
            <Form.Item label="Permissions">
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    {permissions?.map((group) => {
                        const groupKeys = group.children.map((c) => c.key);

                        // compute group checkbox state from live state ONLY
                        const allChecked = groupKeys.every((k) => selectedPermissions.includes(k));
                        const someChecked =
                            groupKeys.some((k) => selectedPermissions.includes(k)) && !allChecked;

                        return (
                            <div
                                key={group.key}
                                style={{
                                    padding: 16,
                                    borderRadius: 10,
                                    background: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    width: "100%",
                                }}
                            >
                                {/* GROUP CHECKBOX */}
                                <Checkbox
                                    indeterminate={someChecked}
                                    checked={allChecked}
                                    onChange={() => toggleGroup(group)}
                                >
                                    <strong>{group.title}</strong>
                                </Checkbox>

                                {/* CHILD CHECKBOXES */}
                                <div style={{ marginTop: 10, paddingLeft: 24 }}>
                                    <Checkbox.Group
                                        value={selectedPermissions.filter((p) => group.children.some(c => c.key === p))}
                                        onChange={(groupValues: string[]) => {
                                            const groupKeys = group.children.map(c => c.key);
                                            const filtered = selectedPermissions.filter(p => !groupKeys.includes(p));
                                            setSelectedPermissions([...filtered, ...groupValues]);
                                        }}
                                    >
                                        <Space wrap>
                                            {group.children.map((child) => (
                                                <Checkbox key={child.key} value={child.key}>
                                                    {child.title}
                                                </Checkbox>
                                            ))}
                                        </Space>
                                    </Checkbox.Group>
                                </div>

                                <Divider style={{ margin: "16px 0" }} />
                            </div>
                        );
                    })}
                </Space>
            </Form.Item>

            {/* SUBMIT BUTTON */}
            <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" onClick={submitForm}>
                    {selectedRole ? "Update Role" : "Create Role"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddRoleForm;
