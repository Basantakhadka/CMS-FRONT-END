import React from 'react';
import { Card, Tabs } from 'antd';
import ContractContainer from './ContractContainer';
import ChangeRequestContainer from './ChangeRequestContainer';

const ContractsTabsContainer: React.FC = () => {
  return (
    <>
      <h2>Contract Management</h2>
      <Card style={{ marginTop: 16 }}>
        <Tabs
          type="card"
          destroyInactiveTabPane
          items={[
            {
              key: 'contracts',
              label: 'Contracts',
              children: (
                <div style={{ padding: '16px 0' }}>
                  <ContractContainer />
                </div>
              ),
            },
            {
              key: 'change-requests',
              label: 'Change Requests',
              children: (
                <div style={{ padding: '16px 0' }}>
                  <ChangeRequestContainer />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
};

export default ContractsTabsContainer;
