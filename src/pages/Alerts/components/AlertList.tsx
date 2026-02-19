import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { User } from '../../../store/slices/usersSlice';
import type { ColumnsType } from 'antd/es/table';

interface AlertsListProps {
  alerts: any;
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
  onView:(value:any)=>any;
}

const AlertList: React.FC<AlertsListProps> = ({
  alerts,
  loading,
  pagination,
  onEdit,
  onDelete,
  onCreate,
  onPageChange,
  onSearch,
  onView
}) => {



 interface ContractAlert {
  id: string;
  contractId: string;
  triggerExpiry: boolean;
  enableCustom: boolean;
  reminderInterval?: number;
  communicationChannels?: string[];
  stakeholders?: string[];
  createdAt: string;
}

 const columns: ColumnsType<ContractAlert> = [
  {
    title: 'SN',
    key: 'sn',
    render: (_text, _record, index) => index + 1,
  },
   {
    title: 'Contract Title',
    dataIndex: 'title',
    key: 'title',
    render: (title?: string) =>
       title || '-',
  },
  {
    title: 'Trigger Expiry',
    dataIndex: 'triggerExpiry',
    key: 'triggerExpiry',
    render: (value: boolean) =>
      value ? <Tag color="green">Enabled</Tag> : <Tag color="red">Disabled</Tag>,
  },
  {
    title: 'Reminder Interval (Days)',
    dataIndex: 'reminderInterval',
    key: 'reminderInterval',
    render: (value?: number) => value ?? '-',
  },
  {
    title: 'Communication Channels',
    dataIndex: 'communicationChannels',
    key: 'communicationChannels',
    render: (channels?: string[]) =>
      channels?.length
        ? channels.map((channel) => (
            <Tag color="blue" key={channel}>
              {channel.toUpperCase()}
            </Tag>
          ))
        : '-',
  },
  {
    title: 'Stakeholders',
    dataIndex: 'stakeholders',
    key: 'stakeholders',
    render: (stakeholders?: any) =>
       stakeholders || '-',
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    render: (_, record:any) => (
      <Space>
        <Tooltip title="View Alert">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />
        </Tooltip>
        <Tooltip title="Edit Alert">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Delete Alert">
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </Tooltip>
      </Space>
    ),
  },
];



  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Search alerts..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Create Alert
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={alerts?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          // total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} alerts`,
          onChange: onPageChange,
        }}
        scroll={{ x: 2400 }}


      />
    </div>
  );
};

export default AlertList;
