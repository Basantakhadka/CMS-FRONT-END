import React from 'react';
import { Modal, Descriptions, Spin } from 'antd';
import type { AuditLog, AuditLogValue } from '../../../../store/slices/auditLogSlice';

interface AuditLogViewModalProps {
  visible: boolean;
  auditLog: AuditLog | null;
  loading: boolean;
  onCancel: () => void;
}

const renderAuditValue = (
  val: AuditLogValue | null,
  compare: AuditLogValue | null,
  color: string
): React.ReactNode => {
  if (!val) return <span>N/A</span>;
  const fields: { label: string; key: keyof AuditLogValue }[] = [
    { label: 'User ID', key: 'userId' },
    { label: 'Username', key: 'userName' },
    { label: 'Employee ID', key: 'employeeId' },
  ];
  const parts = fields
    .filter(({ key }) => val[key])
    .map(({ label, key }) => {
      const changed = compare?.[key] !== val[key];
      return (
        <span key={key} style={changed ? { color, fontWeight: 600 } : undefined}>
          {label}: {val[key]}
        </span>
      );
    });
  if (!parts.length) return <span>N/A</span>;
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span style={{ color: '#999' }}> | </span>}
        </React.Fragment>
      ))}
    </>
  );
};

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
            <Descriptions.Item label="Previous Value">
              {renderAuditValue(auditLog.previousValue, auditLog.newValue, '#d46b08')}
            </Descriptions.Item>
            <Descriptions.Item label="New Value">
              {renderAuditValue(auditLog.newValue, auditLog.previousValue, '#389e0d')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default AuditLogViewModal;
