import { Tabs, Card } from 'antd';
import type { TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NameWithEmailAvatar } from './NameWithEmailAvatar';
import { PasswordTab } from './PasswordTab';
import { AboutTab } from './AboutTab';


export const InfoTab = () => {
  const [tabKey, setTabKey] = useState('about');

//   useEffect(() => {
//     dispatch(fetchProfileService());
//   }, []);

  const profileDetails = useSelector((state: any) => state.profileDetails.payload);

  const items: TabsProps['items'] = [
    {
      key: 'about',
      label: 'About',
      children: <AboutTab details={profileDetails} />,
    },
    {
      key: 'password',
      label: 'Password',
      children: <PasswordTab details={profileDetails} />,
    },
  ];

  return (
    <>
      {/* Profile Header */}
      <div
        style={{
          background: '#F5F6FF',
          padding: 20,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <NameWithEmailAvatar
          name={profileDetails?.userName}
          email={profileDetails?.userId}
        />
      </div>

      {/* Tabs Section */}
      <Card bodyStyle={{ padding: 0 }}>
        <Tabs
          activeKey={tabKey}
          onChange={(key) => setTabKey(key)}
          items={items}
          size="large"
          style={{ padding: 10 }}
        />
      </Card>
    </>
  );
};