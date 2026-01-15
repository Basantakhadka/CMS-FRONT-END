import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { User } from '../../../../store/slices/usersSlice';
import type { ColumnsType } from 'antd/es/table';

interface UsersListProps {
  users: User[];
  loading: boolean;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onCreate: () => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  loading,
  pagination,
  onEdit,
  onDelete,
  onCreate,
  onPageChange,
  onSearch,
}) => {
  const columns: ColumnsType<User> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      key: 'fullName',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'active' ? 'green' : status === 'inactive' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag key={role} color="blue">
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin?: string) =>
        lastLogin ? new Date(lastLogin).toLocaleString() : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit User">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete User">
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Search users..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
};

export default UsersList;
