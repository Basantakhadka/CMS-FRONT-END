import { Card } from 'antd';
import { InfoTab } from './InfoTab';


const Profile = () => {
  return (
    <Card
      style={{
        margin: 16,
        height: 'calc(100vh - 140px)',
        borderRadius: 8,
      }}
    >
      <InfoTab />
    </Card>
  );
};

export default Profile;