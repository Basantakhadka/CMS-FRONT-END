// src/pages/Alerts/AlertsPage.tsx
import React, { useState } from 'react';
import AlertsList from './components/AlertsList';
import AlertsView from './components/AlertsView';
import { mockContracts, mockUsers } from './mockData';

interface Alert {
  id: string;
  contractName: string;
  triggerExpiry: boolean;
  alertTiming: number[];
}

const AlertsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', contractName: 'Contract A', triggerExpiry: true, alertTiming: [15, 30, 90] },
    { id: '2', contractName: 'Contract B', triggerExpiry: false, alertTiming: [30] },
  ]);

  const handleCreateNew = () => setShowForm(true);

  const handleSaveAlert = (newAlert: any) => {
    setAlerts(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        contractName: mockContracts.find(c => c.id === newAlert.contract)?.name || '',
        ...newAlert,
      },
    ]);
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <AlertsView
          contracts={mockContracts}
          users={mockUsers}
          onFinish={handleSaveAlert} // your form will call this on submit
        />
      ) : (
        <AlertsList alerts={alerts} onCreateNew={handleCreateNew} />
      )}
    </div>
  );
};

export default AlertsPage;
