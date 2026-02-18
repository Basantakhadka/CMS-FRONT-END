import React from 'react';
import { Table, Button, Space, Tag, Popconfirm, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { User } from '../../../store/slices/usersSlice';
import type { ColumnsType } from 'antd/es/table';

interface ContractsListProps {
  contracts: any;
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

const ContractList: React.FC<ContractsListProps> = ({
  contracts,
  loading,
  pagination,
  onEdit,
  onDelete,
  onCreate,
  onPageChange,
  onSearch,
  onView
}) => {



interface Contract {
  id: string;
  title: string;
  type: string;
  parties: string[];
  expiryDate: string;
  documentLink: string;
  contractValue?: string;
  jurisdiction?: string;
  renewalTerms?: string;
  governingLaw: string;
  createdAt: string;
  updatedAt?: string;
}

 const columns: ColumnsType<Contract> = [
  {
    title: 'SN',
    key: 'sn',
    render: (_text, _record, index) => index + 1,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Parties',
    dataIndex: 'parties',
    key: 'parties',
    render: (parties: string[]) => parties.join(', '),
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiryDate',
    key: 'expiryDate',
  },
  {
    title: 'Contract Value',
    dataIndex: 'contractValue',
    key: 'contractValue',
    render: (value: string) => `$${parseFloat(value).toLocaleString()}`,
  },
  {
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
    key: 'jurisdiction',
  },
  {
    title: 'Renewal Terms',
    dataIndex: 'renewalTerms',
    key: 'renewalTerms',
  },
  {
    title: 'Governing Law',
    dataIndex: 'governingLaw',
    key: 'governingLaw',
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
    fixed:'right',
    render: (_, record: any) => (
      <Space>
        <Tooltip title="View Contract">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />
        </Tooltip>
        <Tooltip title="Edit Contract">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
        </Tooltip>
        <Popconfirm
          title="Are you sure you want to delete this contract?"
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Contract">
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
          Create Contract
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={contracts?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          // total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} contracts`,
          onChange: onPageChange,
        }}
        scroll={{ x: 2400 }}


      />
    </div>
  );
};

export default ContractList;
