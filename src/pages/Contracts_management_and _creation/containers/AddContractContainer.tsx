import React, { useEffect } from 'react';
import { message, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import AddContact from '../components/AddContract';
import { createContract, fetchContractById, updateContract, type CreateContractPayload, type UpdateContractPayload } from '../../../store/slices/contractSlice';


const AddContractContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  console.log({ id })
  const { individualContract, loading } = useAppSelector((state) => state.contracts);
  console.log({ individualContract })

  const handleSubmit = async (values: CreateContractPayload | UpdateContractPayload) => {
    try {
      console.log('Dispatching updateUser with:', values);
      if (id) {
        const result = await dispatch(updateContract({ values, id: id })).unwrap();
        console.log('Update result:', result);
        message.success('User updated successfully')
        navigate('/contracts');
        return
      } else {
        const result = await dispatch(createContract(values as CreateContractPayload)).unwrap();
        console.log('Create result:', result);
        message.success('User created successfully');
        navigate('/contracts');

        return
      }

    } catch (err) {
      console.error('Caught error:', err);
      message.error(`Failed to ${id ? 'update' : 'create'} contract`);
    }
  };


  useEffect(() => {
    if (id) {
      dispatch(fetchContractById(id));
      console.log('Edit mode for contract id:', id);
    }
  }, [dispatch, id]);


  return (
    <>
      <Skeleton loading={loading} active>
        <AddContact
          onSave={handleSubmit}
          onCancel={() => { }}
          initialData={individualContract && individualContract}

        />

      </Skeleton>

    </>

  );
};

export default AddContractContainer;
