import React from 'react';
import { 
  Table, Tag, Button, Modal, Form, Input, 
  DatePicker, Row, Col, Card, Typography, Divider, Space 
} from 'antd';
import { 
  PlusOutlined, FileTextOutlined, TeamOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface ContractsViewProps {
  data: any[];
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  form: any;
  onFinish: (values: any) => void;
}

const ContractsView: React.FC<ContractsViewProps> = ({ 
  data, 
  isModalOpen, 
  setIsModalOpen, 
  form, 
  onFinish 
}) => {
  const columns = [
    {
      title: 'SN',
      key: 'sn',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Parties',
      dataIndex: 'parties',
      key: 'parties',
      render: (parties: string[]) => parties.join(' vs. '),
    },
    {
      title: 'Effective Date',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="black">ACTIVE</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">View</Button>,
    },
  ];

  return (
    <div style={{ padding: '24px 24px 24px 0px ' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>Contracts</Title>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setIsModalOpen(true)}
            style={{ background: '#000', borderColor: '#000' }}
          >
            New Contract
          </Button>
        </Col>
      </Row>

      <Card bordered={false}>
        <Table columns={columns} dataSource={data} rowKey="key" />
      </Card>

      <Modal
        title={<span><FileTextOutlined /> New Agreement</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        width={750}
        okText="Save Record"
        okButtonProps={{ style: { background: '#000', borderColor: '#000' } }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Divider orientation={"left" as any} style={{ marginTop: 0 }}>
             <Space><TeamOutlined /> General Information</Space>
          </Divider>
          
          <Form.Item 
            name="projectName" 
            label="Project Name" 
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="e.g., Kathmandu Metro Construction" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="party1" label="First Party" rules={[{ required: true }]}>
                <Input placeholder="Employer / Client" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="party2" label="Second Party" rules={[{ required: true }]}>
                <Input placeholder="Contractor / Consultant" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation={"left" as any}>
            <Space><CalendarOutlined /> Contract Terms</Space>
          </Divider>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="effectiveDate" label="Effective Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="expirationDate" label="Expiration Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="noticePeriod" label="Renewal Notice">
                <Input placeholder="e.g., 60 Days" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ContractsView;