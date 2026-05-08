import React from 'react';
import { Table, Input } from 'antd';
import {  SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface ClientsListProps {
  clients: any;
  loading: boolean;
  pagination: {
    current: number;
    sortMeta: string;
    size: number;
  };

  onPageChange: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
}

const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  loading,
  pagination,

  onPageChange,
  onSearch,
}) => {


  interface User {
    id: string;
    client_name: string;
    client_code: string;
  
  }

  const columns: ColumnsType<User> = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text, _record, index) => index + 1, // index starts from 0
    },

    {
      title: 'Client Name',
      dataIndex: 'client_name',
      key: 'client_name',
    },
    {
      title: 'Client Code',
      dataIndex: 'client_code',
      key: 'client_code',
    },
    
  ];


  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="Search clients..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        columns={columns}
        dataSource={clients?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          // total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} clients`,
          onChange: onPageChange,
        }}


      />
    </div>
  );
};

export default ClientsList;
