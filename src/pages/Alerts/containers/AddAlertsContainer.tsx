import React, { useEffect } from 'react';
import { message, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';import AlertsView from '../components/AlertsView';
import { createAlert, fetchAlertById, fetchContractsForAlerts, updateAlert, type CreateContractAlertPayload, type UpdateContractAlertPayload } from '../../../store/slices/contractAlertSlice';


const AddAlertsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { individualAlert, loading, contracts } = useAppSelector((state) => state.alerts);
 

  const handleSubmit = async (values: CreateContractAlertPayload | UpdateContractAlertPayload) => {
    try {
      if (id) {
       await dispatch(updateAlert({ values, id: id })).unwrap();
        message.success('Alert updated successfully')
        navigate('/alerts');
        return
      } else {
        await dispatch(createAlert(values as CreateContractAlertPayload)).unwrap();
        message.success('Alert created successfully');
        navigate('/alerts');

        return
      }

    } catch (err) {
      console.error('Caught error:', err);
    }
  };


  useEffect(() => {
    dispatch(fetchContractsForAlerts())
    if (id) {
      dispatch(fetchAlertById(id));
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
