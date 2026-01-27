import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import type { Role } from '../../../../store/slices/rolesSlice';

interface RolesListProps {
  roles: any;
  loading: boolean;
  pagination: {
    current: number;
    size: number;
    sortMeta: string;
  };
  onEdit: (id: string) => void;
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
  onPageChange,
  onSearch,
}) => {
  const columns = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: 'Role Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModifiedOn',
      key: 'lastModifiedOn',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? 'green' : status === 'Inactive' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Edit Role">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record?.id)}
            />
          </Tooltip>
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
        dataSource={roles?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} roles`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
};

export default RolesList;
