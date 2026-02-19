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
  const { individualContract, loading } = useAppSelector((state) => state.contracts);

  const handleSubmit = async (values: CreateContractPayload | UpdateContractPayload) => {
    try {
      if (id) {
        await dispatch(updateContract({ values, id: id })).unwrap();
        message.success('Contract updated successfully')
        navigate('/contracts');
        return
      } else {
        await dispatch(createContract(values as CreateContractPayload)).unwrap();
        message.success('Contract created successfully');
        navigate('/contracts');

        return
      }

    } catch (err) {
      console.error('Caught error:', err);
    }
  };


  useEffect(() => {
    if (id) {
      dispatch(fetchContractById(id));
    }
  }, [dispatch, id]);


  return (
    <>
      <Skeleton loading={loading} active>
        <AddContact
          onSave={handleSubmit}
          onCancel={() => { }}
          initialData={id?individualContract && individualContract:null}

        />

      </Skeleton>

    </>

  );
};

export default AddContractContainer;
