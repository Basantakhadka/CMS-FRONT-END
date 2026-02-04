import React, { useEffect } from 'react';
import { message, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';import AlertsView from '../components/AlertsView';
import { createAlert, fetchAlertById, fetchContractsForAlerts, updateAlert, type CreateContractAlertPayload, type UpdateContractAlertPayload } from '../../../store/slices/contractAlertSlice';


const AddAlertsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  console.log({ id })
  const { individualAlert, loading, contracts } = useAppSelector((state) => state.alerts);
  console.log({ contracts })
  console.log({ individualAlert })

  const handleSubmit = async (values: CreateContractAlertPayload | UpdateContractAlertPayload) => {
    try {
      console.log('Dispatching updateUser with:', values);
      if (id) {
        const result = await dispatch(updateAlert({ values, id: id })).unwrap();
        console.log('Update result:', result);
        message.success('User updated successfully')
        navigate('/alerts');
        return
      } else {
        const result = await dispatch(createAlert(values as CreateContractAlertPayload)).unwrap();
        console.log('Create result:', result);
        message.success('User created successfully');
        navigate('/alerts');

        return
      }

    } catch (err) {
      console.error('Caught error:', err);
      message.error(`Failed to ${id ? 'update' : 'create'} alert`);
    }
  };


  useEffect(() => {
    dispatch(fetchContractsForAlerts())
    if (id) {
      dispatch(fetchAlertById(id));
      console.log('Edit mode for alert id:', id);
    }
  }, [dispatch, id]);


  return (
    <>
      <Skeleton loading={loading} active>
        <AlertsView
          onFinish={handleSubmit}
          initialData={individualAlert && individualAlert}
          contracts={contracts}

        />

      </Skeleton>

    </>

  );
};

export default AddAlertsContainer;
