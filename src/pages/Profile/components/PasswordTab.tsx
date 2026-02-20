import { Row, Col, Typography, Button, Space, Divider } from 'antd';
import { EditOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Iprops {
  details: any;
}

export const PasswordTab = ({ details }: Iprops) => {
  const dispatch = useDispatch();

  const [policy, setPolicy] = useState({
    minimumUppercase: null,
    minimumNumbers: null,
    minimumSpecialCharacters: null,
    minimumLength: null,
    maximumLength: null,
  });

//   useEffect(() => {
//     async function fetchPolicy() {
//       const resp = await fetchPasswordPolicyService(dispatch);
//       setPolicy(resp?.passwordPolicy);
//     }
//     fetchPolicy();
//   }, []);

  return (
    <div style={{ marginTop: 25 }}>
      
      {/* Header */}
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Text
            style={{
              color: 'rgba(47, 46, 121, 1)',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Login Information
          </Typography.Text>
        </Col>

        <Col>
          <Button
            type="link"
            icon={<EditOutlined />}
            style={{ color: 'rgba(47, 46, 121, 1)', fontWeight: 400 }}
            onClick={() =>console.log('Open Change Password Modal')
            //   openModal('changePassword', <ChangePasswordModal policy={policy} />)
            }
          >
            Change Password
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: '12px 0 18px' }} />

      {/* Username */}
      <Space size={10} align="center">
        <UserOutlined style={{ color: 'rgba(47, 46, 121, 1)' }} />
        <Typography.Text style={{ fontSize: 16 }}>
          {details?.userId || '-'}
        </Typography.Text>
      </Space>

      {/* Password */}
      <div style={{ marginTop: 12 }}>
        <Space size={10} align="center">
          <LockOutlined style={{ color: 'rgba(47, 46, 121, 1)' }} />
          <Typography.Text style={{ fontSize: 16 }}>
            ••••••••
          </Typography.Text>
        </Space>
      </div>
    </div>
  );
};