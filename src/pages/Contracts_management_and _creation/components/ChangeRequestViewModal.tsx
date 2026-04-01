import React from 'react';
import { Modal, Descriptions, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

interface ChangeRequestViewModalProps {
  visible: boolean;
  changeRequest: any | null;
  onClose: () => void;
}

const ChangeRequestViewModal: React.FC<ChangeRequestViewModalProps> = ({ visible, changeRequest, onClose }) => {
  if (!changeRequest) return null;

  return (
    <Modal
      open={visible}
      title={`Change Request Details: ${changeRequest.title}`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Title">{changeRequest.title}</Descriptions.Item>
        <Descriptions.Item label="Type">{changeRequest.type}</Descriptions.Item>
        <Descriptions.Item label="Parties">{changeRequest.parties?.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Expiry Date">
          {changeRequest.expiryDate ? new Date(changeRequest.expiryDate).toLocaleString() : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Contract Date">
          {changeRequest.contractDate ? new Date(changeRequest.contractDate).toLocaleString() : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Document Link">
          {changeRequest.documentLink ? (
            <a href={changeRequest.documentLink} target="_blank" rel="noopener noreferrer">
              <LinkOutlined /> View Document
            </a>
          ) : (
            'N/A'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Contract Value">
          {changeRequest.contractValue
            ? `${parseFloat(changeRequest.contractValue).toLocaleString()}`
            : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Jurisdiction">
          {changeRequest.jurisdiction || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Renewal Terms">
          {changeRequest.renewalTerms || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Governing Law">{changeRequest.governingLaw}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ChangeRequestViewModal;
