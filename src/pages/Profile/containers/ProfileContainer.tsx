import React, { useEffect, useState } from 'react';
import { Alert, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setPagination,
} from '../../../store/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
// import ContractViewModal from '../components/ContractViewModal';
import { deleteAlert, fetchAlerts } from '../../../store/slices/contractAlertSlice';
import ProfileDetails from '../components/ProfileDetails';

const ProfileContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { alerts, loading, pageInfo } = useAppSelector((state) => state.alerts);
  const [reload, setReload] = useState(false);






  const handleCreate = () => {
    navigate('/alerts/add')
  };

  const handleEdit = (data: any) => {
    navigate(`/alerts/edit/${data.id}`);
  };



  const onView = (details: any) => {
    console.log({ details })
  };

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteAlert(userId)).unwrap();
      message.success('Alert deleted successfully');
      setReload(prev => !prev);
      return
    } catch (err) {
      console.log('Failed to delete alert');
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
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <ProfileDetails
          
        />
       
      </div>

    

    </>

  );
};

export default ProfileContainer;
