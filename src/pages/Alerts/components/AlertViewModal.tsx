import React from 'react';
import { Modal, Descriptions, Tag, Button } from 'antd';

interface ViewContractAlertModalProps {
  visible: boolean;
  alert: any | null;
  onClose: () => void;
}

const AlertViewModal: React.FC<ViewContractAlertModalProps> = ({ visible, alert, onClose }) => {
  if (!alert) return null;

  // Helper: display communication channels as tags
  const renderChannels = () => {
    if (!alert.communicationChannels || alert.communicationChannels.length === 0) return 'N/A';
    return alert.communicationChannels.map((ch: string) => <Tag key={ch}>{ch.toUpperCase()}</Tag>);
  };

  return (
    <Modal
      open={visible}
      title={`Contract Alert Details`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={700}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Contract ID">{alert.contractId}</Descriptions.Item>
        <Descriptions.Item label="Trigger Expiry">{alert.triggerExpiry ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Enable Custom">{alert.enableCustom ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Reminder Interval">{alert.reminderInterval || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Communication Channels">{renderChannels()}</Descriptions.Item>
        <Descriptions.Item label="Stakeholders">{alert.stakeholders || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Created At">{new Date(alert.createdAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{new Date(alert.updatedAt).toLocaleString()}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default AlertViewModal;
