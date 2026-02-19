import React from 'react';
import { Modal, Descriptions, Tag, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

interface ViewContractModalProps {
  visible: boolean;
  contract: any | null;
  onClose: () => void;
}

const ContractViewModal: React.FC<ViewContractModalProps> = ({ visible, contract, onClose }) => {
  if (!contract) return null;

  return (
    <Modal
      open={visible}
      title={`Contract Details: ${contract.title}`}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>
      ]}
      width={700}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Title">{contract.title}</Descriptions.Item>
        <Descriptions.Item label="Type">{contract.type}</Descriptions.Item>
        <Descriptions.Item label="Parties">
          {contract.parties.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Expiry Date">{new Date(contract.expiryDate).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Document">
          {contract.documentLink ? (
            <a href={contract.documentLink} target="_blank" rel="noopener noreferrer">
              <LinkOutlined /> View Document
            </a>
          ) : (
            'N/A'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Contract Value">
          {contract.contractValue ? `${parseFloat(contract.contractValue).toLocaleString()}` : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Jurisdiction">{contract.jurisdiction || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Renewal Terms">{contract.renewalTerms || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Governing Law">{contract.governingLaw}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ContractViewModal;
