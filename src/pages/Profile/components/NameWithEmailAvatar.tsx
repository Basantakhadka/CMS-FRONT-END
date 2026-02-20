import { Avatar, Row, Col, Typography } from 'antd';

interface Iprops {
  name: string;
  email: string;
}

export const NameWithEmailAvatar = ({ name, email }: Iprops) => {
  const [firstName = '', lastName = ''] = name?.split(' ') || [''];
  const displayName = lastName
    ? `${firstName?.[0] || ''}${lastName?.[0] || ''}`
    : firstName?.[0] || '-';

  return (
    <Row align="middle" gutter={16} style={{ marginLeft: 16, marginBottom: 16 }}>
      
      {/* Avatar */}
      <Col>
        <Avatar
          shape="square"
          style={{
            width: 120,
            height: 120,
            backgroundColor: 'white',
            color: 'rgba(47, 46, 121, 0.65)',
            borderRadius: 5,
            fontSize: 48,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {displayName}
        </Avatar>
      </Col>

      {/* Name + Email */}
      <Col flex="auto">
        <Typography.Title level={3} style={{ margin: 0, fontWeight: 'bold' }}>
          {name}
        </Typography.Title>

        <Typography.Text
          style={{
            fontWeight: 500,
            fontSize: 16,
            color: '#9198A7',
          }}
        >
          {email}
        </Typography.Text>
      </Col>
    </Row>
  );
};