import React from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { AuditLog } from '../../../../store/slices/auditLogSlice';
import type { ColumnsType } from 'antd/es/table';

interface AuditLogListProps {
  auditLogs: any;
  loading: boolean;
  pagination: {
    current: number;
    sortMeta: string;
    size: number;
  };
  onView: (auditLog: AuditLog) => any;
  onPageChange: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
}

const AuditLogList: React.FC<AuditLogListProps> = ({
  auditLogs,
  loading,
  pagination,
  onView,
  onPageChange,
  onSearch,
}) => {


  interface AuditLogRecord {
    id: string;
    actorUserId: string;
    actorUserName: string;
    resourceType: string;
    resourceId: string;
    resourceLabel: string;
    previousValue: string;
    newValue: string;
    errorMessage: string;
    performedAt: string;
    clientCode: string;
  }

  const columns: ColumnsType<AuditLogRecord> = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Actor User Name',
      dataIndex: 'actorUserName',
      key: 'actorUserName',
    },
    {
      title: 'Resource Type',
      dataIndex: 'resourceType',
      key: 'resourceType',
    },
    {
      title: 'Resource Label',
      dataIndex: 'resourceLabel',
      key: 'resourceLabel',
    },
    {
      title: 'Client Code',
      dataIndex: 'clientCode',
      key: 'clientCode',
    },
    {
      title: 'Performed At',
      dataIndex: 'performedAt',
      key: 'performedAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table<AuditLogRecord>
      columns={columns}
      dataSource={auditLogs?.list || []}
      rowKey="id"
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.size,
        total: auditLogs?.pageInfo?.totalRecords || 0,
        onChange: onPageChange,
        pageSizeOptions: ['5', '10', '20', '50'],
        showSizeChanger: true,
      }}
    />
  );
};

export default AuditLogList;
