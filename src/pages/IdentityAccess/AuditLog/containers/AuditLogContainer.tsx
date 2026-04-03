import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchAuditLogs,
  fetchAuditLogById,
  setPagination,
} from '../../../../store/slices/auditLogSlice';
import type { AuditLog } from '../../../../store/slices/auditLogSlice';
import AuditLogList from '../components/AuditLogList';
import AuditLogViewModal from '../components/AuditLogViewModal';

const AuditLogContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auditLogs, loading, pageInfo } = useAppSelector((state) => state.auditLogs);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAuditLog, setSelectedAuditLog] = useState<AuditLog | null>(null);

  const handleView = (auditLog: AuditLog) => {
    setSelectedAuditLog(auditLog);
    setModalVisible(true);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => { };

  useEffect(() => {
    dispatch(fetchAuditLogs({ filters: [], pageInfo }));
  }, [dispatch]);

  return (
    <>
      <h2>Audit Logs</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <AuditLogList
          auditLogs={auditLogs}
          loading={loading}
          pagination={pageInfo}
          onView={handleView}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
        <AuditLogViewModal
          visible={modalVisible}
          auditLog={selectedAuditLog}
          loading={loading}
          onCancel={() => {
            setModalVisible(false);
            setSelectedAuditLog(null);
          }}
        />
      </div>
    </>
  );
};

export default AuditLogContainer;
