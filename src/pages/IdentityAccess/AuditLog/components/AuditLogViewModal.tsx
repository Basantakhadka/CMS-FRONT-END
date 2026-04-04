import React from 'react';
import { Modal, Descriptions, Spin } from 'antd';
import type { AuditLog } from '../../../../store/slices/auditLogSlice';

interface AuditLogViewModalProps {
  visible: boolean;
  auditLog: AuditLog | null;
  loading: boolean;
  onCancel: () => void;
}

const AuditLogViewModal: React.FC<AuditLogViewModalProps> = ({
  visible,
  auditLog,
  loading,
  onCancel,
}) => {
  return (
    <Modal
      title="Audit Log Details"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Spin spinning={loading}>
        {auditLog && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Actor User ID">
              {auditLog.actorUserId}
            </Descriptions.Item>
            <Descriptions.Item label="Actor User Name">
              {auditLog.actorUserName}
            </Descriptions.Item>
            <Descriptions.Item label="Resource Type">
              {auditLog.resourceType}
            </Descriptions.Item>
            <Descriptions.Item label="Resource ID">
              {auditLog.resourceId}
            </Descriptions.Item>
            <Descriptions.Item label="Resource Label">
              {auditLog.resourceLabel}
            </Descriptions.Item>
            <Descriptions.Item label="Error Message">
              {auditLog.errorMessage || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Client Code">
              {auditLog.clientCode}
            </Descriptions.Item>
            <Descriptions.Item label="Performed At">
              {new Date(auditLog.performedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Action">
              {auditLog.action}
            </Descriptions.Item>
           
            {/* <Descriptions.Item label="Previous Value">
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
                {typeof auditLog.previousValue === 'string' ? auditLog.previousValue : JSON.stringify(auditLog.previousValue, null, 2)}
              </pre>
            </Descriptions.Item>
            <Descriptions.Item label="New Value">
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
                {typeof auditLog.newValue === 'string' ? auditLog.newValue : JSON.stringify(auditLog.newValue, null, 2)}
              </pre>
            </Descriptions.Item> */}
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default AuditLogViewModal;
