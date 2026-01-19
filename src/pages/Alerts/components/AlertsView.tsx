// src/pages/Alerts/components/AlertsView.tsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Switch, Select, Divider, Modal } from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Contract {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

interface AlertsViewProps {
  contracts: Contract[];
  users: User[];
  onFinish: (values: any) => void; // callback to parent page
}

const AlertsView: React.FC<AlertsViewProps> = ({ contracts, users, onFinish }) => {
  const [form] = Form.useForm();
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [customReminder, setCustomReminder] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Enable/disable interval field
  const [intervalDisabled, setIntervalDisabled] = useState(true);

  useEffect(() => {
    setIntervalDisabled(!customReminder);
  }, [customReminder]);

  const handleSave = (values: any) => {
    onFinish(values); // send data to parent
  };

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Alerts Configuration</h1>

      <Card title="Alert Settings" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            triggerExpiry: true,
            customReminder: false,
            alertInterval: 15,
            channels: ['email'],
            stakeholders: [],
          }}
        >
          {/* Select Contract */}
          <Form.Item
            label="Select Contract"
            name="contract"
            rules={[{ required: true, message: 'Please select a contract' }]}
          >
            <Select
              placeholder="Select a contract"
              onChange={(value) => setSelectedContract(value)}
            >
              {contracts.map((c) => (
                <Option key={c.id} value={c.id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Only show below fields if contract is selected */}
          {selectedContract && (
            <>
              {/* Trigger Expiry */}
              <Form.Item
                label="Trigger Expiry Alerts"
                name="triggerExpiry"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              {/* Custom Reminder */}
              <Form.Item
                label="Enable Custom Reminder"
                name="customReminder"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) => setCustomReminder(checked)}
                />
              </Form.Item>

              {/* Reminder Interval */}
              <Form.Item
                label="Reminder Interval (days)"
                name="alertInterval"
                rules={[{ required: customReminder, message: 'Please enter interval' }]}
              >
                <Input
                  type="number"
                  placeholder="Enter interval"
                  disabled={intervalDisabled}
                />
              </Form.Item>

              {/* Communication Channels */}
              <Form.Item label="Communication Channels" name="channels">
                <Select mode="multiple" placeholder="Select channels">
                  <Option value="email">Email</Option>
                  <Option value="sms">SMS</Option>
                  <Option value="whatsapp">WhatsApp</Option>
                </Select>
              </Form.Item>

              {/* Stakeholders */}
              <Form.Item label="Stakeholders" name="stakeholders">
                <Select mode="multiple" placeholder="Select stakeholders">
                  {users.map((u) => (
                    <Option key={u.id} value={u.id}>
                      {u.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Divider />

              <Form.Item>
                <Button
                  type="default"
                  icon={<EyeOutlined />}
                  style={{ marginRight: 8 }}
                  onClick={() => setPreviewVisible(true)}
                >
                  Preview Alert
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Save Alert
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>

      {/* Preview Modal */}
      <Modal
        title="Preview Alert"
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
      </Modal>
    </div>
  );
};

export default AlertsView;
