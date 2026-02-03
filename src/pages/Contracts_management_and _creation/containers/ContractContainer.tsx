import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setPagination,
} from '../../../store/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import ContractList from '../components/ContractList';
import { deleteContract, fetchContracts } from '../../../store/slices/contractSlice';
import ContractViewModal from '../components/ContractViewModal';

const ContractContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { contracts, loading, pageInfo } = useAppSelector((state) => state.contracts);
  console.log({ contracts })
  const [reload, setReload] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  console.log({ viewModalVisible })
  const [selectedContract, setSelectedContract] = useState<any | null>(null);






  const handleCreate = () => {
    navigate('/contracts/createContract')
  };

  const handleEdit = (data: any) => {
    navigate(`/contracts/createContract/${data.id}`);
  };



  const onView = (details: any) => {
    console.log({ details })
    setSelectedContract(details);
    setViewModalVisible(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await dispatch(deleteContract(userId)).unwrap();
      message.success('User deleted successfully');;
      setReload(prev => !prev);
      return
    } catch (err) {
      message.error('Failed to delete user');
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => { }

  useEffect(() => {
    dispatch(fetchContracts({ filters: [], pageInfo }));
  }, [dispatch, reload]);



  return (
    <>
      <h2>Contract Management</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <ContractList
          contracts={contracts}
          loading={loading}
          pagination={pageInfo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onView={onView}
        />
        <ContractViewModal
        visible={viewModalVisible}
        contract={selectedContract}
        onClose={()=>setViewModalVisible(false)}
      />
      </div>

    

    </>

  );
};

export default ContractContainer;
