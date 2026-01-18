// src/pages/Alerts/components/AlertsList.tsx
import React from 'react';
import { Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface Alert {
  id: string;
  contractName: string;
  triggerExpiry: boolean;
  alertTiming: number[];
}

interface AlertsListProps {
  alerts: Alert[];
  onCreateNew: () => void; // callback for New Alert button
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts, onCreateNew }) => {
  const columns = [
    { title: 'Contract', dataIndex: 'contractName', key: 'contractName' },
    { title: 'Trigger Expiry', dataIndex: 'triggerExpiry', key: 'triggerExpiry', render: (v: boolean) => (v ? 'Yes' : 'No') },
    { title: 'Alert Timing (days)', dataIndex: 'alertTiming', key: 'alertTiming', render: (v: number[]) => v.join(', ') },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Alerts and Notifications</h1>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateNew}>
          New Alert
        </Button>
      </Space>

      <Table
        dataSource={alerts}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default AlertsList;
