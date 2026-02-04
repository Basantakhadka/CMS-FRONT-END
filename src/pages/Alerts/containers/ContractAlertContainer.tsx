import React, { useEffect, useState } from 'react';
import { Alert, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setPagination,
} from '../../../store/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
// import ContractViewModal from '../components/ContractViewModal';
import { deleteAlert, fetchAlerts } from '../../../store/slices/contractAlertSlice';
import AlertList from '../components/AlertList';
import AlertViewModal from '../components/AlertViewModal';

const ContractAlertContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { alerts, loading, pageInfo } = useAppSelector((state) => state.alerts);
  const [reload, setReload] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any | null>(null);






  const handleCreate = () => {
    navigate('/alerts/add')
  };

  const handleEdit = (data: any) => {
    navigate(`/alerts/edit/${data.id}`);
  };



  const onView = (details: any) => {
    console.log({ details })
    setSelectedContract(details);
    setViewModalVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteAlert(userId)).unwrap();
      message.success('Alert deleted successfully');
      setReload(prev => !prev);
      return
    } catch (err) {
      message.error('Failed to delete alert');
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => { }

  useEffect(() => {
    dispatch(fetchAlerts({ filters: [], pageInfo }));
  }, [dispatch, reload]);



  return (
    <>
      <h2>Alerts Management</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <AlertList
          alerts={alerts}
          loading={loading}
          pagination={pageInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onView={onView}
        />
        <AlertViewModal
        visible={viewModalVisible}
        alert={selectedContract}
        onClose={()=>setViewModalVisible(false)}
      />
      </div>

    

    </>

  );
};

export default ContractAlertContainer;
