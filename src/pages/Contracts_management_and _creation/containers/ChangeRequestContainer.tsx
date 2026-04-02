import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ChangeRequestList from '../components/ChangeRequestList';
import ChangeRequestViewModal from '../components/ChangeRequestViewModal';
import {
  deleteChangeRequest,
  fetchChangeRequests,
  setChangeRequestPagination,
  approveChangeRequest,
  rejectChangeRequest,
} from '../../../store/slices/changeRequestSlice';

const ChangeRequestContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { changeRequests, loading, pageInfo } = useAppSelector((state) => state.changeRequests);

  const [reload, setReload] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedChangeRequest, setSelectedChangeRequest] = useState<any | null>(null);

  const onView = (details: any) => {
    setSelectedChangeRequest(details);
    setViewModalVisible(true);
  };

  const handleDelete = async (changeRequestId: string) => {
    try {
      await dispatch(deleteChangeRequest(changeRequestId)).unwrap();
      message.success('Change request deleted successfully');
      setReload((prev) => !prev);
    } catch (error) {
      message.error('Failed to delete change request');
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setChangeRequestPagination({ page, pageSize }));
    setReload((prev) => !prev);
  };

  const handleSearch = () => undefined;

  const handleApprove = async (id: string) => {
    try {
      await dispatch(approveChangeRequest(id)).unwrap();
      message.success('Change request approved');
      setReload((prev) => !prev);
    } catch (error) {
      message.error('Failed to approve change request');
    }
  };

  const handleReject = async (id: string, remarks?: string) => {
    try {
      await dispatch(rejectChangeRequest({ id, remarks })).unwrap();
      message.success('Change request rejected');
      setReload((prev) => !prev);
    } catch (error) {
      message.error('Failed to reject change request');
    }
  };

  useEffect(() => {
    dispatch(fetchChangeRequests({ filters: [], pageInfo }));
  }, [dispatch, reload]);

  return (
    <div>
      <ChangeRequestList
        changeRequests={changeRequests}
        loading={loading}
        pagination={pageInfo}
        onDelete={handleDelete}
        onApprove={handleApprove}
        onReject={handleReject}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onView={onView}
      />
      <ChangeRequestViewModal
        visible={viewModalVisible}
        changeRequest={selectedChangeRequest}
        onClose={() => setViewModalVisible(false)}
      />
    </div>
  );
};

export default ChangeRequestContainer;
