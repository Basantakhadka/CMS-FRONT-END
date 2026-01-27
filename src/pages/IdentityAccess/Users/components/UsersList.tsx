import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { User } from '../../../../store/slices/usersSlice';
import type { ColumnsType } from 'antd/es/table';

interface UsersListProps {
  users: any;
  loading: boolean;
  pagination: {
    current: number;
    sortMeta: string;
    size: number;
  };
  onEdit: (user: User) => any;
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


  interface User {
    id: string;
    userName: string;
    employeeId: string;
    userId: string;
    createdOn: string;
    status: 'Enabled' | 'Disabled' | 'Suspended';
  }

  const columns: ColumnsType<User> = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text, _record, index) => index + 1, // index starts from 0
    },

    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'Enabled' ? 'green' : status === 'Disabled' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
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
        dataSource={users?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          // total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} users`,
          onChange: onPageChange,
        }}


      />
    </div>
  );
};

export default UsersList;
