import { Typography, Row, Col, Divider } from 'antd';
import React from 'react';

interface Iprops {
  details: any;
}

export const AboutTab = ({ details }: Iprops) => {
  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Row align="middle" style={{ marginBottom: 14 }}>
      <Col style={{ minWidth: 120, fontWeight: 500 }}>{label}</Col>
      <Col>
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          : {value || '-'}
        </Typography.Text>
      </Col>
    </Row>
  );

  return (
    <div style={{ marginTop: 25 }}>
      
      {/* Section Title */}
      <Typography.Text
        style={{
          color: 'rgba(47, 46, 121, 1)',
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        General Information
      </Typography.Text>

      <Divider style={{ margin: '16px 0' }} />

      {/* Info List */}
      <div>
        <InfoRow label="Username" value={details?.userName} />

        <InfoRow
          label="Role"
          value={details?.roles?.map((u: any) => u.label).join(', ')}
        />

        <InfoRow label="Email" value={details?.userId} />

        <InfoRow label="Employee Id" value={details?.employeeId} />

        <InfoRow label="Branch" value={details?.branch?.label} />
      </div>
    </div>
  );
};