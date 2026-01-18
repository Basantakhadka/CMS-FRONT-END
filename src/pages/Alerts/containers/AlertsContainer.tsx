// src/pages/Alerts/containers/AlertsContainer.tsx
import React, { useState } from 'react';
import AlertsView from '../components/AlertsView';
import { mockContracts, mockUsers } from '../mockData';

interface Alert {
  id: string;
  contract: string;
  triggerExpiry: boolean;
  customReminder: boolean;
  alertInterval?: number;
  channels: string[];
  stakeholders: string[];
}

const AlertsContainer: React.FC = () => {
  // State to store saved alerts
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Callback when form is submitted
  const handleSaveAlert = (newAlert: any) => {
    const alertWithId: Alert = {
      id: Date.now().toString(), // unique ID
      ...newAlert,
    };

    setAlerts(prev => [...prev, alertWithId]); // add new alert to state

    console.log('Saved alert:', alertWithId); // for testing
    alert('Alert saved successfully! Check console.');
  };

  return (
    <div>
      {/* Pass mock data and onFinish callback to AlertsView */}
      <AlertsView
        contracts={mockContracts}
        users={mockUsers}
        onFinish={handleSaveAlert}
      />
    </div>
  );
};

export default AlertsContainer;
