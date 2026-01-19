// src/pages/Contracts/containers/ContractsContainer.tsx
import React, { useState } from 'react';
import { Form } from 'antd';
import ContractsView from '../components/ContractsView';

const ContractsContainer: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false); // This is the state
  
  const [contracts, setContracts] = useState([
    {
      key: '1',
      projectName: 'Kathmandu Ring Road Project',
      parties: ['Gov of Nepal', 'Shanghai Construction'],
      effectiveDate: '2026-01-20',
    }
  ]);

  const handleCreateContract = (values: any) => {
    const newEntry = {
      key: Date.now().toString(),
      projectName: values.projectName,
      parties: [values.party1, values.party2],
      effectiveDate: values.effectiveDate.format('YYYY-MM-DD'),
    };
    
    setContracts([newEntry, ...contracts]);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <ContractsView 
      data={contracts}
      isModalOpen={isModalOpen} // Pass the state
      setIsModalOpen={setIsModalOpen} // Pass the setter function
      form={form}
      onFinish={handleCreateContract}
    />
  );
};

export default ContractsContainer;