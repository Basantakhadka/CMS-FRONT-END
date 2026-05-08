import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ClientsList from '../Components/ClientList';
import { setPagination } from '../../../store/slices/auditLogSlice';
import { fetchClients } from '../../../store/slices/clientSlice';


const ClientsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clients, loading, pageInfo } = useAppSelector((state) => state.clients);



  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setPagination({ page, pageSize }));
  };

  const handleSearch = () => { }

  useEffect(() => {
    dispatch(fetchClients({ filters: [], pageInfo }));
  }, [dispatch]);



  return (
    <>
      <h2>User Management</h2>
      <div style={{ padding: '24px 24px 24px 0px' }}>
        <ClientsList
          clients={clients}
          loading={loading}
          pagination={pageInfo}
  
          onPageChange={handlePageChange}
          onSearch={handleSearch}
        />
        
      </div>
    </>

  );
};

export default ClientsContainer;
