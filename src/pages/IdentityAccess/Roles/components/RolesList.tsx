import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import type { Role } from '../../../../store/slices/rolesSlice';
import type { ColumnsType } from 'antd/es/table';

interface RolesListProps {
  roles: Role[];
  loading: boolean;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
  onCreate: () => void;
  onAssignUsers: (role: Role) => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
}

const RolesList: React.FC<RolesListProps> = ({
  roles,
  loading,
  pagination,
  onEdit,
  onDelete,
  onCreate,
  onAssignUsers,
  onPageChange,
  onSearch,
}) => {
  const columns: ColumnsType<Role> = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record) => (
        <>
          {name}
          {record.isSystem && (
            <Tag color="purple" style={{ marginLeft: 8 }}>
              SYSTEM
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: any[]) => (
        <Tag color="blue">{permissions.length} permissions</Tag>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => <Tag color="green">{count} users</Tag>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Role">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              disabled={record.isSystem}
            />
          </Tooltip>
          <Tooltip title="Assign Users">
            <Button
              type="link"
              icon={<UserAddOutlined />}
              onClick={() => onAssignUsers(record)}
            />
          </Tooltip>
          {!record.isSystem && (
            <Popconfirm
              title="Are you sure you want to delete this role?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Role">
                <Button type="link" danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Search roles..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Add Role
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={roles}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} roles`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
};

export default RolesList;
