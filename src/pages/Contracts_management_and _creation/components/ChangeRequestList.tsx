import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Input, Tooltip, Tag, Modal, Form } from 'antd';
import { DeleteOutlined, SearchOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';


interface ChangeRequestListProps {
  changeRequests: any;
  loading: boolean;
  pagination: {
    current: number;
    sortMeta: string;
    size: number;
  };
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string, remarks?: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
  onView: (value: any) => void;
}

interface ChangeRequest {
  id: string;
  contractId: string;
  changeType: string;
  status: string;
  requestedBy: string;
  requestedAt: string;
  remarks?: string | null;
}

const statusColor = (status?: string) => {
  const normalized = status?.toUpperCase() || 'PENDING';
  if (normalized === 'APPROVED') return 'green';
  if (normalized === 'REJECTED') return 'red';
  return 'gold';
};

const ChangeRequestList: React.FC<ChangeRequestListProps> = ({
  changeRequests,
  loading,
  pagination,
  onDelete,
  onApprove,
  onReject,
  onPageChange,
  onSearch,
  onView,
}) => {
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedRejectId, setSelectedRejectId] = useState<string | null>(null);
  const [remarks, setRemarks] = useState('');
  const [form] = Form.useForm();

  const handleRejectClick = (id: string) => {
    setSelectedRejectId(id);
    setRemarks('');
    form.resetFields();
    setRejectModalVisible(true);
  };

  const handleRejectConfirm = () => {
    if (selectedRejectId) {
      onReject(selectedRejectId, remarks);
      setRejectModalVisible(false);
      setSelectedRejectId(null);
      setRemarks('');
    }
  };
  const columns: ColumnsType<ChangeRequest> = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text, _record, index) => (pagination.current - 1) * pagination.size + index + 1,
    },
    {
      title: 'Change Type',
      dataIndex: 'changeType',
      key: 'changeType',
      render: (type: string) => type || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={statusColor(status)}>{status || 'Pending'}</Tag>,
    },
    {
      title: 'Requested By',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      render: (value: string) => value || 'N/A',
    },
    {
      title: 'Requested At',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: (date: string) => (date ? new Date(date).toLocaleString() : 'N/A'),
    },
    // {
    //   title: 'Remarks',
    //   dataIndex: 'remarks',
    //   key: 'remarks',
    //   render: (remarks?: string | null) => remarks || '—',
    // },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record: any) => (
        <Space>
          <Tooltip title="View Change Request">
            <Button type="link" icon={<EyeOutlined />} onClick={() => onView(record)} />
          </Tooltip>
          {record.status?.toUpperCase() !== 'APPROVED' && (
            <Tooltip title="Mark Approved">
              <Button type="link" icon={<CheckOutlined />} onClick={() => onApprove(record.id)} />
            </Tooltip>
          )}
          {record.status?.toUpperCase() !== 'REJECTED' && (
            <Tooltip title="Reject Change Request">
              <Button
                type="link"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleRejectClick(record.id)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search change requests..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        columns={columns}
        dataSource={changeRequests?.list}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.size,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} change requests`,
          onChange: onPageChange,
        }}
        scroll={{ x: 2400 }}
      />

      <Modal
        title="Reject Change Request"
        open={rejectModalVisible}
        onOk={handleRejectConfirm}
        onCancel={() => {
          setRejectModalVisible(false);
          setSelectedRejectId(null);
          setRemarks('');
        }}
        okText="Reject"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Remarks (Optional)"
            name="remarks"
            rules={[
              {
                max: 500,
                message: 'Remarks cannot exceed 500 characters',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter your remarks for rejection..."
              rows={4}
              maxLength={500}
              showCount
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangeRequestList;
