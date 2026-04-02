import React, { useMemo } from 'react';
import { Modal, Button, Table, Tag, Divider } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

interface ChangeRequestViewModalProps {
  visible: boolean;
  changeRequest: any | null;
  onClose: () => void;
}

const ChangeRequestViewModal: React.FC<ChangeRequestViewModalProps> = ({ visible, changeRequest, onClose }) => {
  if (!changeRequest) return null;

  const { oldValue, newValue, status, changeType, requestedBy, requestedAt, remarks } = changeRequest;

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      if (value instanceof Date) {
        return new Date(value).toLocaleString();
      }
      return JSON.stringify(value);
    }
    if (typeof value === 'string' && value.includes('T')) {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return value;
      }
    }
    return String(value);
  };

  const isValueChanged = (oldVal: any, newVal: any): boolean => {
    return JSON.stringify(oldVal) !== JSON.stringify(newVal);
  };

  const comparisonData = useMemo(() => {
    const allKeys = new Set<string>();
    
    if (oldValue) {
      Object.keys(oldValue).forEach(key => allKeys.add(key));
    }
    if (newValue) {
      Object.keys(newValue).forEach(key => allKeys.add(key));
    }

    return Array.from(allKeys).map((key) => ({
      key,
      field: key.replace(/_/g, ' ').toUpperCase(),
      oldValue: oldValue?.[key] ?? null,
      newValue: newValue?.[key] ?? null,
      isChanged: isValueChanged(oldValue?.[key], newValue?.[key]),
    }));
  }, [oldValue, newValue]);

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
      width: '30%',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Old Value',
      dataIndex: 'oldValue',
      key: 'oldValue',
      width: '35%',
      render: (value: any) => <span>{formatValue(value)}</span>,
    },
    {
      title: 'New Value',
      dataIndex: 'newValue',
      key: 'newValue',
      width: '35%',
      render: (value: any) => <span>{formatValue(value)}</span>,
    },
  ];

  const rowClassName = (record: any) => {
    return record.isChanged ? 'changed-row' : '';
  };

  return (
    <Modal
      open={visible}
      title={`Change Request Details - ${changeType}`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={1000}
      bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
    >
      <style>{`
        .changed-row {
          background-color: #ffebee !important;
        }
        
        .change-request-header {
          margin-bottom: 20px;
        }
        
        .header-row {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        
        .header-item {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .header-item strong {
          min-width: 100px;
        }
      `}</style>

      <div className="change-request-header">
        <div className="header-row">
          <div className="header-item">
            <strong>Status:</strong>
            <Tag color={status === 'PENDING' ? 'processing' : status === 'APPROVED' ? 'success' : 'error'}>
              {status}
            </Tag>
          </div>
          <div className="header-item">
            <strong>Change Type:</strong>
            <Tag>{changeType}</Tag>
          </div>
          <div className="header-item">
            <strong>Requested By:</strong>
            <span>{requestedBy}</span>
          </div>
        </div>
        <div className="header-row">
          <div className="header-item">
            <strong>Requested At:</strong>
            <span>{requestedAt}</span>
          </div>
          {remarks && (
            <div className="header-item">
              <strong>Remarks:</strong>
              <span>{remarks}</span>
            </div>
          )}
        </div>
      </div>

      <Divider />

      <Table
        columns={columns}
        dataSource={comparisonData}
        rowClassName={rowClassName}
        pagination={false}
        size="small"
        bordered
      />
    </Modal>
  );
};

export default ChangeRequestViewModal;
